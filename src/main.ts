import * as core from "@actions/core";
import * as github from "@actions/github";
import { createActionAuth } from "@octokit/auth-action";
import {
  DeploymentOutcome,
  WorkflowRunConclusion,
  JobConclusion
} from "./types";

async function getJobConclusions() {
  const auth = createActionAuth();
  const authentication = await auth();
  const octokit = github.getOctokit(authentication.token);
  const response = await octokit.rest.actions.listJobsForWorkflowRun({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    run_id: github.context.runId
  });

  return response.data.jobs.reduce(
    (acc, currentJob) => [...acc, currentJob.conclusion],
    [] as Array<string | null>
  );
}

function hasSkippedDeployments() {
  let deploymentOutcome = core.getInput("deployments_outcome");
  try {
    deploymentOutcome = JSON.parse(deploymentOutcome);
    return deploymentOutcome.includes(DeploymentOutcome.SKIPPED);
  } catch (parsingError) {
    return deploymentOutcome === DeploymentOutcome.SKIPPED;
  }
}

async function run(): Promise<void> {
  try {
    const jobsConclusion = await getJobConclusions();
    let conclusion = "";
    if (jobsConclusion.includes(JobConclusion.FAILURE)) {
      conclusion = WorkflowRunConclusion.FAILED;
    } else if (jobsConclusion.includes(JobConclusion.CANCELLED)) {
      conclusion = WorkflowRunConclusion.STOPPED;
    } else {
      if (hasSkippedDeployments()) {
        conclusion = WorkflowRunConclusion.SKIPPED;
      } else {
        conclusion = WorkflowRunConclusion.SUCCEEDED;
      }
    }

    core.setOutput("conclusion", conclusion);
  } catch (error) {
    core.setFailed(`Action failed with error ${error}`);
  }
}

run();
