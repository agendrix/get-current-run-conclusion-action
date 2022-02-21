/**
 * Workflow run conclusion: https://github.com/agendrix/slack-notifier/blob/main/lambda/workflows/github-actions.ts
 */
export enum WorkflowRunConclusion {
  FAILED = "FAILED",
  STOPPED = "STOPPED",
  SUCCEEDED = "SUCCEEDED",
  SKIPPED = "SKIPPED"
}

/**
 * Job conclusion: https://docs.github.com/en/rest/reference/actions#get-a-job-for-a-workflow-run
 */
export enum JobConclusion {
  SUCCESS = "success",
  FAILURE = "failure",
  CANCELLED = "cancelled",
  SKIPPED = "skipped"
}

/**
 * Deployment outcome: https://github.com/agendrix/wait-for-ecs-service-deployment-action/blob/main/src/ecs/types.ts
 */
export enum DeploymentOutcome {
  SUCCESS = "success",
  SKIPPED = "skipped"
}
