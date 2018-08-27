# Docker Exec

This module is a tiny __CLI__ tool that runs `docker exec` by image name.  In other words, run commands inside your docker conatiner by image name. 

Without this tool you would have to perform a `docker ps` first to get a list of running containers, find your container ID, then do something to the effect of `docker exec -i -t 7c0410c64a19 npm rebuild`.  Only a two step process and not that big of a deal, but somewhat of a pain if you are doing local development and brining up and down containers on the same image.

### Install
```bash
npm install docker-exec-cli -g
```

## Usage
```bash
docker-exec <image-name> <cmd+args>
```

#### Multiple Containers
What happens if there are multiple running containers with the same image name?  Then the command will be applied to all running containers matching the image name.
