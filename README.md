# Get Current workflow run conclusion

This action computes the conclusion of the current workflow.

See [action.yml](./action.yml) for the list of `inputs` and `outputs`.

## Example usage

```yaml
ping-slack:
  name: Ping slack to update workflow run conclusion
  runs-on: ubuntu-latest

  steps:
    - name: Get workflow run conclusion
      id: current-run-conclusion
      uses: agendrix/get-current-run-conclusion-action@v1.0.0
      with:
        deployment_outcome: ${{ needs.main_deployment.deployment_outcome }}
    - name: Ping Slack for outcome
      uses: agendrix/slack-notifier/ping-slack@v1.0.5
      with:
        state: ${{ steps.current-run-conclusion.outputs.conclusion }}
        lambda-url: ${{ secrets.slack_lambda_endpoint }}
        api-secret: ${{ secrets.slack_api_secret }}
```
