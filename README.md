# TraktCord
## Make Your Changes

First, make the necessary changes to your code, commit new features or fixes, and ensure everything is in the state you want to tag as a release.

## Stage Your Changes

Use the `git add` command to stage the changes you want to include in the commit that you'll tag. For example:

```bash
git add .
```
This command stages all changes in the current directory.


## Commit Your Changes
Commit the staged changes with a descriptive commit message. This commit will be associated with the tag you create. For example:

```bash
git commit -m "Add new features and fixes for version 1.0.0"
```
Here, `-a` specifies that you're creating an annotated tag, and -m allows you to provide a message for the tag.

## Create a Tag
After you've committed your changes, you can create a tag using the git tag command. For example, to create a tag for version 1.0.0:

```bash
git tag -a v1.0.0 -m "Version 1.0.0"
```

### Push the Tag
Finally, you push the tag to your remote repository on GitHub:

```bash
git push origin v1.0.0
```
Replace `v1.0.0` with the actual tag name you created.
