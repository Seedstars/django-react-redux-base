# kubernetes-django-react

This series of manifests are provided in a templated manner, for the deployment
and testing of [Django-react](https://github.com/Seedstars/django-react-redux-base) on [Kubernetes](https://kubernetes.io/) via [Google Container Engine](https://cloud.google.com/container-engine/).

Terms:

-  Google Cloud Platform (**GCP**)
-  Google Container Engine (**GKE**)
-  Kubernetes (**k8s**)

Contents:

-  Manifest YAML for all objects needed by GKE
-  Generation script to combine them into a single YAML, after customizing IP, domain, and email per-deployment

Requirements:

-  [Google Cloud Platform](https://cloud.google.com/) account. This can be a trial, or paid account.
-  [Google Cloud SDK](https://cloud.google.com/sdk/) for using `gcloud` commands. This SDK also includes the necessary `kubectl` utilities.
-  Access to a `bash` shell. It is recommended at this time to use a GNU/Linux-based or OSX operating system.
-  Access to the internet via HTTPS traffic.


# Deploying Django React with GKE & k8s

These instructions will bring up a fully functional Django React instance on GKE.

Features included in this deployment:

- Django React
- Fully integrated [Let's Encrypt](https://letsencrypt.org/) for all components, environments, and deployments

Steps:

1.  Fetch templates
1.  Create a GKE cluster
1.  Reserve a Static IP in GCP
1.  Register a DNS Entry
1.  Generate your configuration
1.  Connect to cluster via `gcloud`
1.  Deploy via `kubectl`

## Fetch templates

[This repository](https://github.com/Seedstars/django-react-redux-base) contains a total of 24 YAML files, and a `generate.bash` script which will combine these into one, and translate placeholder values to the values you provide in later steps.

## Create a GKE cluster

Login to [GCP console](https://console.cloud.google.com) and navigate to Compute > [Container Engine](https://console.cloud.google.com/kubernetes) via the menu, or follow the link directly. Here, we will use the `+ Create Cluster` button to create a new cluster for deploying Django React.

You can name this cluster how you see fit, and place it in any *Zone* that you wish. It is suggested that the cluster be made up of at least 3 nodes, and that the *Machine type* include at least 2 vCPU for performance reasons.

As you make this cluster, take note of the *Zone* that it is created it, as we will need this for the create of the Static IP in the next step.

## Reserve a Static IP in GCP

Navigate to Compute > [Networking](https://console.cloud.google.com/networking) via the navigation menu, or follow the link directly. Here, we will reserve the Static IP address that the deployed Django React instance will use for Ingress control. This step is very important because of the requirement for the Domain Name Service to be able to consistently resolve, and allow Let's Encrypt integration across all services.

Once on the Networking page of GCP, navigate to `External IP addresses`, and use the `+ Reserve Static Address` button. You may supply any name you wish here, as this is not a host name but a descriptor. For this, be sure to the the *Region* to that which includes the *Zone* used when creating the GKE cluster. If you selected `us-central1-b`, your *Region* would be `us-central1`. Once the necessary fields are complete, click `Reserve`.

Once the process has completed, you will be returned to the `External IP Addresses` page, and will find a new entry with your newly reserved, but unused Static IP Address. Make note of this, as it will be used in the next step.

## Register a DNS Entry

Once you have completed the previous step, it is now time to ensure that you have a valid DNS entry for the Django React deployment. This [A Record](https://support.google.com/a/answer/48090?hl=en#H) should be a [wildcard](https://support.google.com/domains/answer/4633759?hl=en) entry, so that all forms of subdomains will point to your Ingress point within the GKE cluster.

Due to the number of possible DNS providers and services that are possible to be used here, we will not cover the exact specifics for any one provider.

For best reliability, it is highly recommended to **not use** a service such as [xip.io](https://xip.io) because Let's Encrypt enforces a [rate limit](http://letsencrypt.org/docs/rate-limits/) on toplevel domains, and you are likely to have a *very sub-par* experience.

## Generate your configuration

After configuring static IP and setting up DNS Entry you now need to generate YAML file with configuration that uses both.

To do that just run following command:

```shell
DJANGO_REACT_LEGO_EMAIL=email@example.com \
DJANGO_REACT_GKE_IP=100.10.20.30 \
DJANGO_REACT_GKE_DOMAIN=k8s.example.com \
bash generate.bash
```
Where:
* *DJANGO_REACT_LEGO_EMAIL* - Let's Encrypt registration and recovery contact. This address **must be functional**.
* *DJANGO_REACT_GKE_IP* - static IP configured in previous steps.
* *DJANGO_REACT_GKE_DOMAIN* - DNS entry configured previously (but without actual wildcard).

This command will generate YAML file with your Django React cluster configuration. For our example domain the filename will be `django-react-k8s-example-com.yml`

## Connect to cluster via `gcloud`

To apply the configuration to Kubernetes cluster you first need to configure your kubectl command line tool to connect to proper cluster.

Go to following GKE page [Cluster List](https://console.cloud.google.com/kubernetes/list), find your cluster. Click *Connect* button that is just besides your cluster name. From window that will pop up copy the gcloud command that will be shown and execute in your terminal.
This command will configure your local kubernetes command line client.

The command should look similar to following:
```shell
gcloud container clusters get-credentials <cluster-name> \
    --zone <availability-zone> --project <project-id>
```

## Deploy via `kubectl`

Once you have everything configured you can deploy the Django React to your Kubernetes cluster by invoking following command:

```shell
kubectl apply -f <generated-configuration-filename>
```

All necessary components will start deploying to your cluster. You can track the progress of that by going to Kubernetes Dashboard of the cluster. One example way to do this is to launch
```shell
kubectl proxy
```

And then you can access your dashboard by going to [http://localhost:8001/ui](http://localhost:8001/ui).

Once your cluster finishes deploying you will be able to access your new Django React installation by going to

```
https://django-react.<wildcard-dns-entry>/
```

## Monitoring with Prometheus

After Django React is up and running, you will be able to connect to the Prometheus console to view the metrics that are collected. To connect to the Prometheus server, open:

```
https://prometheus.<wildcard-dns-entry>/
```

It will monitor the system resources of the Django React container, providing insight into metrics like CPU, memory, and throughput. It is also configured to collect metrics from all Nodes in the Kubernetes cluster.

Sample Prometheus queries:
* % Memory Used: `(1 - ((node_memory_MemFree + node_memory_Cached) / node_memory_MemTotal)) * 100`
* % CPU Load: `1 - rate(node_cpu{mode="idle"}[5m])`
* Data Transmitted: `irate(node_network_transmit_bytes[5m])`
* Data Received: `irate(node_network_receive_bytes[5m])`

Prometheus project integration has also been enabled by default, utilizing the bundled Prometheus server.

# Upgrading to a new version

Upgrading your Kubernetes deployment of Django React proves to be quite simple.

* Fetch the latest `master` with `git checkout master && git pull`
* Re-run the `generate.bash` with the same variables originally used.
* Apply the updates YAML with `kubectl apply -f gitlab-{domain}.yml`
