# Overview
This project was designed to be a simple web portfolio to showcase some of my projects, as well as get some experience with React, Electron, UI libraries, and hosting on AWS.

**This project is completely open source.** Please feel free to fork or clone this repo and use it in any way you see fit!

# Why Bother With Electron for a Web App?
Notably, the use of Electron in this project may seem strange as this is intended to be primarily, if not completely, as a web application at this time. However, I wanted to get some experience working with Electron and being able to run the project as a "native" desktop app if I'd like to. While this project does not currently take real advantage of any Electron capabilities, it serves as good practice and a starting point for any future cross-platform projects I wish to take on.

# Deployment Strategy
This repository has a simple Github action script to automatically deploy changes to the main branch to my production webserver. The workflow builds my project with dependencies, and then pushes those files to my Apache webserver running in AWS. Files are transfered to a temporary folder, and once done transferring, are then copied to the main production directory. In the future, I'd like to add more error handling to this deployment script to mitigate the risk of downtime due to an interrupted file transfer or similar error.

# Lightsail vs. EC2 vs. The World
Initially, this project was intended to run exclusively on Lightsail as I wanted something that was stupid simple to set up and maintain. While this approach worked great for the initial few milestones, I quickly started to run into issues.

Primarily, Lightsail does not have native integration with the AWS IAM service, which otherwise would allow my web app to be granted permissions through IAM to access the whole host of AWS services. This was a major limitation as I otherwise have to manage sensitive permanant access keys in order to configure my AWS SDK clients in-code.

This led me to begin migrating this project to an EC2 instance, which would have the full capabilities of IAM and AWS in it's arsenal to utilize however I see fit. While a little more complex to set up and manage, it's not all too different than Lightsail at the end of the day. 

An argument could be made that EC2 is overengineering for the simple portfolio site I'm going for. After all, with static content I could host my site with a combination of a public S3 bucket and Cloudfront. I see this project however as an evolving playground for small web toys and utilities, such as a GPT-4 integration demo or other interactive, API-driven widgets. As such, I feel that EC2 is a good platform to gain experience on while I slowly add new capabilities to the site. 

# DNS and SSL
I manage my DNS records through my domain-provider GoDaddy. Unfortunately, the `.dev` TLD that I wished to use is not supported natively through Amazon's Route53 and thus must be purchased through another domain provider.

I obtained a free SSL certificate for my site, allowing secure https:// connections, through the nonprofit organization [Let's Encrypt](https://letsencrypt.org/). 

# UI Components
The primary UI library I'm using for this project is [ChakraUI](https://chakra-ui.com/), which I would highly reccomend. It's easy to set up and get started, and all the components are clean and modern. 

# Status Reports
[![Previous Deployment to AWS](https://github.com/kylemaestro/codefolio/actions/workflows/lightsail-deploy.yml/badge.svg?event=push)](https://github.com/kylemaestro/codefolio/actions/workflows/lightsail-deploy.yml)
