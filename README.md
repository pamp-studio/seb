# Guide

The site is made with the open source framework Gatsby based on React. There is no database or backend server - it's a new wave snappy static secure functional website hosted for £0 monetary cost on Github Pages + £0 Cloudflare DNS / SSL (https) security certicate. A paypal account is required for the ecommerce. Once we've configured this you should only need to keep paying £ for your Domain name.

For each page you will have a folder containing a page file and any media files associated with that page's content. You will use JSON data syntax at the top of each page file to include mandatory information i.e. Page Title, Published Date, Description, Tags; and optional Image Gallery and Products. Beneath the data section on each page file you add your page content using Mardown Language/HTML. When you create a new folder for a new page you should just copy the most similar other page folder to start with; update the folder name, page title, description etc and delete any irrelevant media from the new folder before reviewing/publishing. Tags (e.g. painting, audio, exhibition) are used to organise each page in the site navigation.

# 1. Initial Set up (first time you edit)
1.1 **Create a £0 account github.com**
Let us know your username to get access to the code/content *repository*.

1.2 **Install Software to run/edit/publish the website on/from your computer.**
- Visual Studio Code (use to edit pages and create new folders as well as its built-in Terminal to run git and npm commands) https://code.visualstudio.com/
- Git https://git-scm.com/downloads
- Node https://nodejs.org/en/

1.3 **Pull down the repository from github and install the npm packages.**

```git clone https://github.com/itsticks/your-website.git``` 

```cd your-website```

```npm install```

# 2. Publishing (every time you edit)
2.1 Navigate into your site’s directory and sync the latest code/content from the central repository.

```git pull```

2.2 Get the website running on your computer at the url http://127.0.0.1:8000.

```npm run develop```

2.3 Publish changes to the world wide web. It usually takes about 5 minutes before you can refresh the live website and see your changes.

```git add -A```

```git commit -m "some wee message about what you updated"```

```git push```

```npm run deploy```
