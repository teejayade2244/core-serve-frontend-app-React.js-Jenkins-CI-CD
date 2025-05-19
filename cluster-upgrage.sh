#!/bin/bash

# Set strict error handling
set -euo pipefail

# Define versions
KUBE_ADM_LET_CTL_VERSION="1.32.0-1.1"
REPO_VERSION="v1.32"
NODE_NAME="controlplane"
CLUSTER_VERSION="v1.32.0"
NODE_NAME="controlplane"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Helper function for logging
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}" >&2
    exit 1
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
    error "This script must be run as root or with sudo privileges"
fi


# Add Kubernetes repository
log "Adding Kubernetes repository..."
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/${REPO_VERSION}/deb/ /" | tee /etc/apt/sources.list.d/kubernetes.list || error "Failed to add Kubernetes repository"

# Download and add the GPG key
log "Downloading Kubernetes GPG key..."
curl -fsSL https://pkgs.k8s.io/core:/stable:/${REPO_VERSION}/deb/Release.key | gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg || error "Failed to download GPG key"

# Update package index
log "Updating package index..."
apt-get update || error "Failed to update package index"

# Drain the node
log "Draining node ${NODE_NAME}..."
kubectl drain "${NODE_NAME}" --ignore-daemonsets || error "Failed to drain node"

# Upgrade kubeadm
log "Upgrading kubeadm..."
apt-mark unhold kubeadm || error "Failed to unhold kubeadm"
apt-get install -y kubeadm="${KUBE_ADM_LET_CTL_VERSION}" || error "Failed to install kubeadm"
apt-mark hold kubeadm || error "Failed to hold kubeadm"

# Verify kubeadm version
log "Verifying kubeadm version..."
kubeadm version || error "Failed to verify kubeadm version"

# Plan the upgrade
log "Planning the upgrade..."
kubeadm upgrade plan || error "Failed to plan upgrade"

# Upgrade control plane
log "Upgrading control plane components..."
kubeadm upgrade apply "${CLUSTER_VERSION}" -y || error "Failed to upgrade control plane"

# Upgrade kubelet and kubectl
log "Upgrading kubelet and kubectl..."
apt-mark unhold kubelet kubectl || error "Failed to unhold kubelet and kubectl"
apt-get install -y kubelet="${KUBE_ADM_LET_CTL_VERSION}" kubectl="${KUBE_ADM_LET_CTL_VERSION}" || error "Failed to install kubelet and kubectl"
apt-mark hold kubelet kubectl || error "Failed to hold kubelet and kubectl"

# Restart kubelet
log "Restarting kubelet..."
systemctl daemon-reload || error "Failed to reload daemon"
systemctl restart kubelet || error "Failed to restart kubelet"

# Uncordon the node
log "Uncordoning node ${NODE_NAME}..."
kubectl uncordon "${NODE_NAME}" || error "Failed to uncordon node"

log "Cluster upgrade completed successfully!"

# Verify the status
log "Current cluster status:"
kubectl get nodes