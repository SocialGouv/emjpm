# NodeJS

> NodeJs chart

## Configuration

The following table lists the configurable parameters of the chart and their default values.

| Parameter                                       | Description                             | Default                               |
| ----------------------------------------------- | --------------------------------------- | ------------------------------------- |
| `image.pullPolicy`                              | NodeJs Image pull policy                | `IfNotPresent`                        |
| `image.repository`                              | NodeJs Image name                       | `node`                                |
| `image.tag`                                     | NodeJs Image tag                        | `lts-alpine`                          |
| `deployment.annotations`                        | Annotations for the Deployment          | `{}`                                  |
| `deployment.env`                                | Environment variables                   | `[{PORT: 80, NODE_ENV: "production"}` |
| `deployment.imagePullSecrets`                   | Specify Image pull secrets              | `[]`                                  |
| `deployment.initContainers`                     | Init Containers                         | `[]`                                  |
| `deployment.livenessProbe.initialDelaySeconds`  | Delay before first liveness             | `5`                                   |
| `deployment.livenessProbe.path`                 | Path for the liveness                   | `/`                                   |
| `deployment.livenessProbe.periodSeconds`        | Liveness period                         | `10`                                  |
| `deployment.livenessProbe.failureThreshold`     | Number of allowed failures              | `10`                                  |
| `deployment.livenessProbe.timeoutSeconds`       | Probe request timeout                   | `10`                                  |
| `deployment.port`                               | Container port                          | `80`                                  |
| `deployment.readinessProbe.initialDelaySeconds` | Delay before first readiness            | `5`                                   |
| `deployment.readinessProbe.path`                | Path for the readiness                  | `/`                                   |
| `deployment.readinessProbe.periodSeconds`       | Readiness period                        | `10`                                  |
| `deployment.readinessProbe.failureThreshold`    | Number of allowed failures              | `10`                                  |
| `deployment.readinessProbe.timeoutSeconds`      | Probe request timeout                   | `10`                                  |
| `deployment.replicaCount`                       | replica count                           | `1`                                   |
| `deployment.resources`                          | CPU/Memory resource requests/limits     | Memory: `16-32Mi`, CPU: `5-50m`       |
| `ingress.annotations`                           | Annotations for the Ingress             | `{}`                                  |
| `ingress.enabled`                               | Enable ingress                          | `false`                               |
| `ingress.hosts`                                 | Hosts for the Ingress                   | `[]`                                  |
| `ingress.tls`                                   | Tls for the Ingress                     | `[]`                                  |
| `labels`                                        | Extra label to add deploy, src, and ing | `{}`                                  |
| `service.port`                                  | NodeJs port                             | `ClusterIP`                           |
| `service.type`                                  | Kubernetes Service type                 | `ClusterIP`                           |
