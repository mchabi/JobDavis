# Git Workflow Guidelines for Frontend Development

A comprehensive guide for implementing structured Git commit workflows in NextJS 14 and Vite projects using Husky, Prettier, and commit conventions.

## 🚀 Universal Setup (Works with npm, yarn, pnpm, bun)

### Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd <your-project>

# Universal setup - automatically detects your package manager
npm run setup
# OR manually with any package manager:
npm install && npx husky init
yarn install && npx husky init
pnpm install && npx husky init
bun install && npx husky init
```

### Platform Support

✅ **Windows** | ✅ **macOS** | ✅ **Linux**

This project is fully cross-platform and works with:

- **Node.js 24+** (required)
- **Package Managers**: npm, yarn, pnpm, bun
- **Operating Systems**: Windows, macOS, Linux

## Why This Workflow?

### Purpose

This workflow is designed to enforce consistent development practices and maintain high code quality across teams. Here's why each component matters:

#### 1. Standardized Commit Messages

- **Problem**: Unclear commit messages make it difficult to track changes and understand project history
- **Solution**: Using Conventional Commits format ensures:
  - Easy generation of changelogs
  - Simple identification of breaking changes
  - Clear communication of change impact
  - Automated version management

#### 2. Branch Naming Conventions

- **Problem**: Inconsistent branch names lead to confusion and difficult project management
- **Solution**: Structured branch naming:
  - Links code to project tasks/tickets
  - Shows purpose of changes (feature, bugfix, etc.)
  - Enables automated workflows
  - Simplifies branch management and cleanup

#### 3. Automated Quality Checks

- **Problem**: Manual code quality management is error-prone and inconsistent
- **Solution**: Pre-commit and pre-push hooks:
  - Prevent commits with incorrect formatting
  - Enforce code style consistency
  - Catch issues before they reach the repository
  - Save time in code reviews

#### 4. Developer Experience Benefits

- Reduced cognitive load through automation
- Consistent codebase across team members
- Faster onboarding for new developers
- Simplified project maintenance
- Better collaboration through clear standards

#### 5. Project Management Benefits

- Clear tracking of feature development
- Easy identification of changes for releases
- Simplified debugging through clear history
- Better integration with CI/CD pipelines
- Enhanced project documentation

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Installation](#installation)
- [Configuration](#configuration)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Automated Checks](#automated-checks)
- [Best Practices and Tips](#best-practices-and-tips)
- [Tools Explained](#tools-explained)

## Prerequisites

- Bun Package Manager
- Git
- Node.js (Latest LTS version recommended)

## Project Setup

### For New Projects

```bash
bun create cloudflare@latest proj-name --framework=next
cd proj-name
```

### Required Dependencies

Install the necessary development dependencies:

```bash
bun add husky prettier validate-branch-name @commitlint/{cli,config-conventional} prettier-plugin-tailwindcss
```

## Configuration

### Prettier Configuration

Add the following to your `package.json`:

```json
{
  "prettier": {
    "plugins": ["prettier-plugin-tailwindcss"]
  }
}
```

### Git Hooks and Validation Setup

Run these commands to set up Git hooks and validation:

```bash
bun husky init

# Create branch name validation configuration
echo '{
    "pattern": "^(master|main|dev|uat|ppt|(feature|release|bugfix|hotfix|test|chore)/(:\\d+-)?[a-zA-Z0-9\\-]+)$",
    "errorMsg": "Branch name must be in this format: (master|main|dev|uat|ppt|(feature|release|bugfix|hotfix|test|chore)/(:<TASK-NO>-)?<SHORT-DESCRIPTION>) , change branch name by this command(git branch -m <newname>). Task Number is optional and can be used from Jira/Github Project Management Tool/Any other Project Management Tool."
}' > .validate-branch-namerc.json

# Set up Git hooks
echo "bun lint-staged" > .husky/pre-commit
echo "bun validate-branch-name" > .husky/pre-push
echo "bun --no -- commitlint --edit \$1" > .husky/commit-msg
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
chmod +x .husky/commit-msg
```

### Commit Lint Configuration

Create `commitlint.config.js` with the following content:

```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "type-case": [2, "always", "lowerCase"],
    "type-empty": [2, "never"],
    "scope-case": [2, "always", "lowerCase"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 72],
  },
};
```

## Branch Naming Convention

Branches must follow this pattern:

- `master` or `main`: Production branch
- `dev`: Development branch
- `uat`: User Acceptance Testing branch
- `ppt`: Pre-production Testing branch [for product only]
- Feature branches: `feature/:<TASK-NO>-description`
- Bug fixes: `bugfix/:<TASK-NO>-description`
- Hotfixes: `hotfix/:<TASK-NO>-description`
- Release branches: `release/:<VERSION>-description`
- Test branches: `test/:<TASK-NO>-description`
- Chore branches: `chore/:<TASK-NO>-description`

Note: Task numbers are optional and can reference Jira, GitHub issues, or other project management tools.

## Commit Message Guidelines

Commits must follow the Conventional Commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Allowed Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: General maintenance
- `revert`: Reverting previous changes

## Automated Checks

The following checks run automatically:

- Pre-commit: Runs lint-staged
- Pre-push: Validates branch naming
- Commit-msg: Validates commit message format

## Best Practices and Tips

### For Teams

1. **Documentation**: Keep this README updated with team-specific requirements
2. **Training**: Ensure new team members understand the workflow
3. **Reviews**: Use the standardized format to streamline code reviews
4. **Integration**: Link commit messages to project management tools

### For Individual Developers

1. **Local Setup**: Verify all hooks are working after initial setup
2. **Commit Frequency**: Make small, focused commits
3. **Message Quality**: Write clear, descriptive commit messages
4. **Branch Management**: Clean up branches after merging

### Common Issues and Solutions

1. **Hook Not Executing**:
   - Verify permissions: `chmod +x .husky/*`
   - Check Husky installation: `bun husky install`

2. **Commit Message Rejected**:
   - Review commit message format
   - Use `git commit --amend` to fix the last commit

3. **Branch Name Rejected**:
   - Use `git branch -m new-name` to rename branch
   - Follow the naming convention pattern

## Tools Explained

### Husky

- Git hooks management
- Automates pre-commit and pre-push checks
- Ensures consistency across team

### Prettier

- Code formatting automation
- Maintains consistent style
- Integrated with pre-commit hooks

### CommitLint

- Validates commit message format
- Ensures meaningful version control
- Enables automated changelog generation

### Validate Branch Name

- Enforces branch naming conventions
- Prevents inconsistent branch names
- Maintains clear project structure

## Notes

- ESLint configuration is flexible and can be customized according to project requirements
- This setup works for both NextJS 14 and Vite projects
- Frontend-focused but applicable to backend projects as well
