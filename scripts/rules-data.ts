// Seed data for rules - 100+ curated rules for AI coding tools

export interface RuleSeed {
  title: string;
  description?: string;
  content: string;
  tools: string[];
  task_types: string[];
  stacks?: string[];
  category?: string;
  tags?: string[];
}

export const rules: RuleSeed[] = [
  // File Creation & Organization
  {
    title: "Always create files before editing",
    description: "Never edit files that don't exist. Create them first with proper structure.",
    content: "When implementing a feature, always create new files before editing existing ones. Use the write tool to create files, then edit them. This prevents errors and ensures proper file structure.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["mvp", "prototype", "production"],
    stacks: ["typescript", "javascript", "python"],
    category: "File Management",
    tags: ["discipline", "organization"]
  },
  {
    title: "Use absolute paths in imports",
    description: "Prefer absolute imports over relative paths for better maintainability.",
    content: "Use absolute import paths (e.g., '@/components/Button') instead of relative paths (e.g., '../../components/Button'). Configure path aliases in tsconfig.json or jsconfig.json.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript", "react", "nextjs"],
    category: "Code Style",
    tags: ["imports", "maintainability"]
  },
  {
    title: "Group related files in feature folders",
    description: "Organize code by feature, not by file type.",
    content: "Organize files by feature/domain rather than by type. For example: /features/auth/components, /features/auth/hooks, /features/auth/utils instead of /components/auth, /hooks/auth.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "react", "nextjs"],
    category: "File Management",
    tags: ["organization", "architecture"]
  },

  // Code Style & Patterns
  {
    title: "Use TypeScript strict mode",
    description: "Enable strict TypeScript checks for better type safety.",
    content: "Always use TypeScript strict mode. Set 'strict: true' in tsconfig.json. This catches more errors at compile time and improves code quality.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production", "refactor"],
    stacks: ["typescript"],
    category: "Code Style",
    tags: ["typescript", "type-safety"]
  },
  {
    title: "Prefer const assertions for immutable data",
    description: "Use 'as const' for arrays and objects that shouldn't change.",
    content: "Use 'as const' assertion for arrays and objects that are immutable. Example: const colors = ['red', 'blue'] as const; This provides better type inference.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["typescript"],
    category: "Code Style",
    tags: ["typescript", "immutability"]
  },
  {
    title: "Use async/await instead of promises",
    description: "Prefer async/await syntax over .then() chains for readability.",
    content: "Use async/await instead of promise chains. It's more readable and easier to debug. Only use .then() when you need to run promises in parallel.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["mvp", "prototype", "production"],
    stacks: ["typescript", "javascript"],
    category: "Code Style",
    tags: ["async", "readability"]
  },
  {
    title: "Extract magic numbers to named constants",
    description: "Replace magic numbers with descriptive constant names.",
    content: "Extract magic numbers and strings to named constants. Example: const MAX_RETRIES = 3; const DEFAULT_TIMEOUT = 5000; This improves readability and maintainability.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript", "python"],
    category: "Code Style",
    tags: ["readability", "maintainability"]
  },
  {
    title: "Use early returns to reduce nesting",
    description: "Prefer early returns over deeply nested if statements.",
    content: "Use early returns (guard clauses) to reduce nesting. Instead of if (condition) { ... } else { return; }, use if (!condition) return; ... This improves readability.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript", "python"],
    category: "Code Style",
    tags: ["readability", "patterns"]
  },
  {
    title: "Prefer named exports over default exports",
    description: "Use named exports for better refactoring and IDE support.",
    content: "Prefer named exports over default exports. They provide better IDE support, easier refactoring, and clearer import statements. Use default exports only for React components or when required by framework conventions.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript", "react"],
    category: "Code Style",
    tags: ["exports", "maintainability"]
  },
  {
    title: "Use descriptive variable names",
    description: "Choose variable names that clearly express intent.",
    content: "Use descriptive variable names that express intent. Avoid abbreviations unless they're widely understood. Prefer 'userCount' over 'uc', 'isAuthenticated' over 'auth'.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["mvp", "prototype", "production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Code Style",
    tags: ["readability", "naming"]
  },
  {
    title: "Keep functions small and focused",
    description: "Functions should do one thing and do it well.",
    content: "Keep functions small and focused on a single responsibility. If a function does multiple things, split it. Aim for functions under 20-30 lines when possible.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript", "python"],
    category: "Code Style",
    tags: ["functions", "maintainability"]
  },
  {
    title: "Use optional chaining for nested properties",
    description: "Use ?. operator to safely access nested properties.",
    content: "Use optional chaining (?.) and nullish coalescing (??) operators to safely access nested properties. Example: user?.profile?.name ?? 'Anonymous'",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript"],
    category: "Code Style",
    tags: ["safety", "modern-syntax"]
  },

  // Error Handling
  {
    title: "Always handle errors explicitly",
    description: "Don't ignore errors. Handle them appropriately.",
    content: "Always handle errors explicitly. Use try/catch blocks, .catch() for promises, or proper error boundaries. Never silently ignore errors. Log them appropriately.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Error Handling",
    tags: ["errors", "reliability"]
  },
  {
    title: "Use custom error classes",
    description: "Create specific error types for better error handling.",
    content: "Create custom error classes for different error types. Example: class ValidationError extends Error { ... }. This allows for better error handling and debugging.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Error Handling",
    tags: ["errors", "types"]
  },
  {
    title: "Validate input at API boundaries",
    description: "Validate all inputs at API entry points.",
    content: "Validate all inputs at API boundaries (API routes, function parameters). Use libraries like Zod, Yup, or Joi for runtime validation. Never trust user input.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Error Handling",
    tags: ["validation", "security"]
  },
  {
    title: "Provide meaningful error messages",
    description: "Error messages should help users and developers understand what went wrong.",
    content: "Provide meaningful error messages that help users understand what went wrong and how to fix it. Avoid generic messages like 'An error occurred'. Include context when safe.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Error Handling",
    tags: ["errors", "ux"]
  },
  {
    title: "Use error boundaries in React",
    description: "Implement error boundaries to catch component errors.",
    content: "Use React error boundaries to catch errors in component trees. Create an ErrorBoundary component that catches errors and displays a fallback UI instead of crashing the app.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["react", "nextjs"],
    category: "Error Handling",
    tags: ["react", "errors"]
  },

  // Testing
  {
    title: "Write tests for critical paths",
    description: "Focus testing efforts on critical business logic and user flows.",
    content: "Write tests for critical paths: authentication, payments, data mutations, and core business logic. Don't test implementation details. Test behavior and outcomes.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Testing",
    tags: ["testing", "quality"]
  },
  {
    title: "Use descriptive test names",
    description: "Test names should describe what is being tested.",
    content: "Use descriptive test names that describe what is being tested. Follow pattern: 'should [expected behavior] when [condition]'. Example: 'should return user when valid id provided'.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Testing",
    tags: ["testing", "readability"]
  },
  {
    title: "Mock external dependencies in tests",
    description: "Isolate tests by mocking external services and APIs.",
    content: "Mock external dependencies (APIs, databases, file system) in tests. Use libraries like MSW (Mock Service Worker) for API mocking. Keep tests fast and isolated.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Testing",
    tags: ["testing", "mocking"]
  },
  {
    title: "Test edge cases and error scenarios",
    description: "Don't just test the happy path.",
    content: "Test edge cases: empty inputs, null values, boundary conditions, network failures, invalid data. Test both success and failure scenarios.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Testing",
    tags: ["testing", "edge-cases"]
  },

  // Documentation
  {
    title: "Document complex logic with comments",
    description: "Explain why, not what, in comments.",
    content: "Document complex logic, algorithms, and business rules with comments. Explain why something is done a certain way, not what the code does (code should be self-documenting).",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript", "python"],
    category: "Documentation",
    tags: ["documentation", "maintainability"]
  },
  {
    title: "Use JSDoc for function documentation",
    description: "Document function parameters and return values.",
    content: "Use JSDoc comments to document function parameters, return values, and exceptions. This provides IDE autocomplete and generates documentation. Example: /** @param {string} userId - The user's unique identifier */",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Documentation",
    tags: ["documentation", "types"]
  },
  {
    title: "Keep README up to date",
    description: "README should explain how to set up and run the project.",
    content: "Keep README.md up to date with setup instructions, environment variables, available scripts, and project structure. Include examples of common tasks.",
    tools: ["cursor", "claude_code"],
    task_types: ["mvp", "prototype", "production"],
    stacks: [],
    category: "Documentation",
    tags: ["readme", "onboarding"]
  },
  {
    title: "Document API endpoints",
    description: "Document API endpoints with request/response examples.",
    content: "Document all API endpoints with request/response examples, error codes, and authentication requirements. Use OpenAPI/Swagger or similar tools for API documentation.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Documentation",
    tags: ["api", "documentation"]
  },

  // Dependencies
  {
    title: "Pin dependency versions in production",
    description: "Use exact versions or lock files for production dependencies.",
    content: "Pin dependency versions in production. Use package-lock.json or yarn.lock. Avoid using ^ or ~ ranges in production. This ensures consistent builds across environments.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Dependencies",
    tags: ["dependencies", "reliability"]
  },
  {
    title: "Regularly update dependencies",
    description: "Keep dependencies up to date for security and features.",
    content: "Regularly update dependencies to get security patches and new features. Use tools like npm-check-updates or Dependabot. Test thoroughly after updates.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript"],
    category: "Dependencies",
    tags: ["dependencies", "security"]
  },
  {
    title: "Audit dependencies for security vulnerabilities",
    description: "Regularly check for known vulnerabilities.",
    content: "Regularly audit dependencies for security vulnerabilities. Use 'npm audit' or similar tools. Fix high and critical vulnerabilities promptly.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Dependencies",
    tags: ["dependencies", "security"]
  },
  {
    title: "Minimize dependencies",
    description: "Only add dependencies when necessary.",
    content: "Minimize dependencies. Before adding a new package, consider if you can implement it yourself or if a smaller alternative exists. Each dependency adds maintenance burden.",
    tools: ["cursor", "claude_code"],
    task_types: ["mvp", "prototype", "production"],
    stacks: ["typescript", "javascript"],
    category: "Dependencies",
    tags: ["dependencies", "simplicity"]
  },

  // Performance
  {
    title: "Use React.memo for expensive components",
    description: "Memoize components that render frequently with same props.",
    content: "Use React.memo() for components that render frequently with the same props. This prevents unnecessary re-renders. Don't overuse it - measure first.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["react"],
    category: "Performance",
    tags: ["react", "performance"]
  },
  {
    title: "Debounce search inputs",
    description: "Debounce user input to reduce API calls.",
    content: "Debounce search inputs and other user-triggered API calls. Use libraries like lodash.debounce or a custom hook. Typical delay: 300-500ms.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["react", "nextjs"],
    category: "Performance",
    tags: ["performance", "ux"]
  },
  {
    title: "Lazy load routes and components",
    description: "Use code splitting to reduce initial bundle size.",
    content: "Use React.lazy() and Suspense for route-based code splitting. Lazy load heavy components that aren't immediately visible. This reduces initial bundle size.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["react", "nextjs"],
    category: "Performance",
    tags: ["performance", "bundling"]
  },
  {
    title: "Optimize images",
    description: "Use Next.js Image component or similar optimizations.",
    content: "Use Next.js Image component or similar image optimization. Serve images in modern formats (WebP, AVIF), use appropriate sizes, and lazy load images below the fold.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["nextjs"],
    category: "Performance",
    tags: ["performance", "images"]
  },
  {
    title: "Use database indexes for frequent queries",
    description: "Add indexes to columns used in WHERE clauses and JOINs.",
    content: "Add database indexes to columns frequently used in WHERE clauses, JOINs, and ORDER BY. Monitor slow queries and add indexes as needed. Don't over-index.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Performance",
    tags: ["database", "performance"]
  },
  {
    title: "Cache expensive computations",
    description: "Cache results of expensive operations.",
    content: "Cache results of expensive computations, API calls, or database queries. Use React Query, SWR, or similar libraries for API caching. Use useMemo for expensive calculations.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["react", "nextjs"],
    category: "Performance",
    tags: ["performance", "caching"]
  },

  // Security
  {
    title: "Never commit secrets",
    description: "Use environment variables for sensitive data.",
    content: "Never commit secrets, API keys, or passwords to version control. Use environment variables (.env files) and add .env to .gitignore. Use services like Vercel Environment Variables or AWS Secrets Manager.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["mvp", "prototype", "production"],
    stacks: [],
    category: "Security",
    tags: ["security", "secrets"]
  },
  {
    title: "Sanitize user input",
    description: "Sanitize all user input to prevent XSS attacks.",
    content: "Sanitize all user input to prevent XSS attacks. Use libraries like DOMPurify for HTML sanitization. Escape special characters when rendering user content.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "react"],
    category: "Security",
    tags: ["security", "xss"]
  },
  {
    title: "Use parameterized queries",
    description: "Prevent SQL injection with parameterized queries.",
    content: "Always use parameterized queries or ORM methods instead of string concatenation for database queries. This prevents SQL injection attacks. Never trust user input in queries.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Security",
    tags: ["security", "sql-injection"]
  },
  {
    title: "Implement rate limiting",
    description: "Protect APIs from abuse with rate limiting.",
    content: "Implement rate limiting on API endpoints to prevent abuse and DoS attacks. Use middleware or services like Upstash Rate Limit. Set appropriate limits per endpoint.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Security",
    tags: ["security", "rate-limiting"]
  },
  {
    title: "Use HTTPS in production",
    description: "Always use HTTPS for production deployments.",
    content: "Always use HTTPS in production. Configure SSL/TLS certificates. Use services like Let's Encrypt for free certificates. Redirect HTTP to HTTPS.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Security",
    tags: ["security", "https"]
  },
  {
    title: "Validate and sanitize file uploads",
    description: "Validate file types, sizes, and scan for malware.",
    content: "Validate file uploads: check file type, size limits, and scan for malware. Store uploads outside the web root. Use signed URLs for file access. Never execute uploaded files.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Security",
    tags: ["security", "uploads"]
  },
  {
    title: "Use secure session management",
    description: "Implement secure session handling.",
    content: "Use secure session management: HttpOnly cookies, SameSite attributes, secure flag in production, and proper session expiration. Use libraries like next-auth or similar.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["nextjs"],
    category: "Security",
    tags: ["security", "sessions"]
  },

  // Git & Commits
  {
    title: "Write clear commit messages",
    description: "Use conventional commit format.",
    content: "Write clear commit messages using conventional commits format: 'type(scope): description'. Types: feat, fix, docs, style, refactor, test, chore. Example: 'feat(auth): add GitHub OAuth login'",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["mvp", "prototype", "production"],
    stacks: [],
    category: "Git",
    tags: ["git", "commits"]
  },
  {
    title: "Make atomic commits",
    description: "Each commit should represent a single logical change.",
    content: "Make atomic commits - each commit should represent a single logical change. Don't mix unrelated changes. Use 'git add -p' to stage parts of files.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: [],
    category: "Git",
    tags: ["git", "commits"]
  },
  {
    title: "Keep commits focused",
    description: "Don't commit everything at once.",
    content: "Keep commits focused on a single feature or fix. Break large changes into smaller, logical commits. This makes code review easier and history more useful.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: [],
    category: "Git",
    tags: ["git", "commits"]
  },
  {
    title: "Use .gitignore properly",
    description: "Ignore build artifacts, dependencies, and secrets.",
    content: "Use .gitignore to exclude build artifacts (node_modules, .next, dist), IDE files (.vscode, .idea), environment files (.env), and OS files (.DS_Store). Keep it up to date.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["mvp", "prototype", "production"],
    stacks: [],
    category: "Git",
    tags: ["git", "ignore"]
  },

  // Communication Style
  {
    title: "Be explicit in code, not comments",
    description: "Code should be self-documenting.",
    content: "Write code that is self-documenting. Use descriptive names, clear structure, and good patterns. Comments should explain why, not what. If code needs explanation, consider refactoring.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript", "python"],
    category: "Communication",
    tags: ["readability", "code-quality"]
  },
  {
    title: "Use consistent naming conventions",
    description: "Follow language and framework conventions.",
    content: "Use consistent naming conventions. Follow language conventions: camelCase for variables/functions, PascalCase for classes/components, UPPER_CASE for constants. Be consistent within the codebase.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript", "python"],
    category: "Communication",
    tags: ["naming", "consistency"]
  },
  {
    title: "Format code consistently",
    description: "Use Prettier or similar formatters.",
    content: "Use code formatters like Prettier, Black, or gofmt. Configure format-on-save in your IDE. This eliminates style debates and keeps code consistent.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript", "python"],
    category: "Communication",
    tags: ["formatting", "consistency"]
  },
  {
    title: "Use TypeScript for better communication",
    description: "Types serve as documentation.",
    content: "Use TypeScript (or type hints in Python) to communicate intent. Types serve as documentation and catch errors early. Avoid 'any' type - use 'unknown' if type is truly unknown.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["typescript"],
    category: "Communication",
    tags: ["typescript", "types"]
  },

  // React/Next.js Specific
  {
    title: "Use custom hooks for reusable logic",
    description: "Extract reusable logic into custom hooks.",
    content: "Extract reusable logic into custom hooks. Name hooks with 'use' prefix. Custom hooks make logic reusable and testable. Example: useAuth(), useLocalStorage().",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["react", "nextjs"],
    category: "Code Style",
    tags: ["react", "hooks"]
  },
  {
    title: "Keep components small and focused",
    description: "Components should have a single responsibility.",
    content: "Keep React components small and focused on a single responsibility. If a component is doing too much, split it into smaller components. Aim for components under 100-150 lines.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production", "refactor"],
    stacks: ["react", "nextjs"],
    category: "Code Style",
    tags: ["react", "components"]
  },
  {
    title: "Use server components in Next.js",
    description: "Prefer server components for better performance.",
    content: "Use React Server Components in Next.js 13+ by default. Only use 'use client' when you need interactivity, hooks, or browser APIs. Server components reduce bundle size and improve performance.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["nextjs"],
    category: "Performance",
    tags: ["nextjs", "performance"]
  },
  {
    title: "Handle loading and error states",
    description: "Always handle loading and error states in UI.",
    content: "Always handle loading and error states in UI components. Show loading spinners, skeleton screens, or progress indicators. Display user-friendly error messages with retry options.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["react", "nextjs"],
    category: "UX",
    tags: ["react", "ux"]
  },
  {
    title: "Use proper key props in lists",
    description: "Use stable, unique keys for list items.",
    content: "Use stable, unique keys for list items. Don't use array indices as keys if items can be reordered. Use IDs or other stable identifiers. This helps React efficiently update the DOM.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production", "refactor"],
    stacks: ["react"],
    category: "Code Style",
    tags: ["react", "performance"]
  },
  {
    title: "Avoid prop drilling",
    description: "Use Context API or state management for shared state.",
    content: "Avoid prop drilling - passing props through many component levels. Use React Context API for shared state that doesn't change often, or state management libraries (Zustand, Redux) for complex state.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["react", "nextjs"],
    category: "Code Style",
    tags: ["react", "state"]
  },
  {
    title: "Use TypeScript for React props",
    description: "Type all component props with TypeScript.",
    content: "Type all React component props with TypeScript. Use interfaces or types for prop definitions. This catches errors at compile time and provides better IDE support.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["react", "typescript"],
    category: "Code Style",
    tags: ["react", "typescript"]
  },
  {
    title: "Optimize images with Next.js Image",
    description: "Always use Next.js Image component for images.",
    content: "Always use Next.js Image component instead of <img> tags. It provides automatic optimization, lazy loading, and responsive images. Required for production Next.js apps.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["nextjs"],
    category: "Performance",
    tags: ["nextjs", "images"]
  },
  {
    title: "Use dynamic imports for code splitting",
    description: "Split code at route and component level.",
    content: "Use dynamic imports (next/dynamic) for code splitting. Lazy load heavy components, modals, and routes that aren't immediately needed. This reduces initial bundle size.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["nextjs"],
    category: "Performance",
    tags: ["nextjs", "performance"]
  },
  {
    title: "Handle API routes properly",
    description: "Use proper HTTP methods and status codes.",
    content: "In Next.js API routes, use proper HTTP methods (GET, POST, PUT, DELETE) and status codes (200, 201, 400, 401, 404, 500). Validate request body and handle errors appropriately.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["nextjs"],
    category: "API",
    tags: ["nextjs", "api"]
  },

  // Python Specific
  {
    title: "Use type hints in Python",
    description: "Add type hints for better code documentation.",
    content: "Use type hints in Python 3.5+ for better code documentation and IDE support. Use typing module for complex types. Example: def process_user(user_id: int) -> User: ...",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["python"],
    category: "Code Style",
    tags: ["python", "types"]
  },
  {
    title: "Use virtual environments",
    description: "Always use virtual environments for Python projects.",
    content: "Always use virtual environments (venv, virtualenv, or poetry) for Python projects. Never install packages globally. This isolates dependencies and prevents conflicts.",
    tools: ["cursor", "claude_code"],
    task_types: ["mvp", "prototype", "production"],
    stacks: ["python"],
    category: "Dependencies",
    tags: ["python", "environments"]
  },
  {
    title: "Use list/dict comprehensions",
    description: "Prefer comprehensions over loops when appropriate.",
    content: "Use list and dict comprehensions when they improve readability. They're more Pythonic and often faster. Don't overuse them for complex logic - readability comes first.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production", "refactor"],
    stacks: ["python"],
    category: "Code Style",
    tags: ["python", "idioms"]
  },
  {
    title: "Handle exceptions explicitly",
    description: "Catch specific exceptions, not bare except.",
    content: "Catch specific exceptions, not bare 'except:'. Use 'except ValueError:' or 'except (ValueError, TypeError):' instead. This prevents catching unexpected exceptions like KeyboardInterrupt.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["python"],
    category: "Error Handling",
    tags: ["python", "errors"]
  },
  {
    title: "Use pathlib instead of os.path",
    description: "Prefer pathlib for file path operations.",
    content: "Use pathlib.Path instead of os.path for file path operations. It's more modern, readable, and cross-platform. Example: Path('data') / 'file.txt' instead of os.path.join('data', 'file.txt').",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["python"],
    category: "Code Style",
    tags: ["python", "modern"]
  },

  // General Best Practices
  {
    title: "Don't optimize prematurely",
    description: "Write clear code first, optimize when needed.",
    content: "Don't optimize prematurely. Write clear, correct code first. Optimize only when you have performance problems and have measured the bottleneck. Premature optimization makes code harder to maintain.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["mvp", "prototype"],
    stacks: ["typescript", "javascript", "python"],
    category: "General",
    tags: ["optimization", "philosophy"]
  },
  {
    title: "Refactor when needed",
    description: "Don't let technical debt accumulate.",
    content: "Refactor code when it becomes hard to understand or maintain. Don't let technical debt accumulate. Small, incremental refactors are better than large rewrites.",
    tools: ["cursor", "claude_code"],
    task_types: ["refactor"],
    stacks: ["typescript", "javascript", "python"],
    category: "General",
    tags: ["refactoring", "maintainability"]
  },
  {
    title: "Review your own code",
    description: "Review your code before committing.",
    content: "Review your own code before committing. Check for typos, logic errors, and improvements. Use git diff to review changes. This catches mistakes early.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["production"],
    stacks: [],
    category: "General",
    tags: ["review", "quality"]
  },
  {
    title: "Keep functions pure when possible",
    description: "Pure functions are easier to test and reason about.",
    content: "Keep functions pure (no side effects, same input = same output) when possible. Pure functions are easier to test, reason about, and parallelize. Separate pure logic from side effects.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript", "python"],
    category: "Code Style",
    tags: ["functions", "testing"]
  },
  {
    title: "Use meaningful variable names",
    description: "Names should reveal intent.",
    content: "Use meaningful variable names that reveal intent. Avoid single-letter variables except for loop counters. Prefer 'userCount' over 'c', 'isAuthenticated' over 'auth'.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["mvp", "prototype", "production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Communication",
    tags: ["naming", "readability"]
  },
  {
    title: "Avoid deep nesting",
    description: "Keep nesting levels shallow.",
    content: "Avoid deep nesting (more than 2-3 levels). Use early returns, extract functions, or use guard clauses to reduce nesting. Deep nesting makes code hard to read and understand.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript", "python"],
    category: "Code Style",
    tags: ["readability", "structure"]
  },
  {
    title: "Use constants for configuration",
    description: "Extract configuration values to constants.",
    content: "Extract configuration values (API URLs, timeouts, limits) to constants or config files. Don't hardcode values in the middle of code. This makes changes easier and code more maintainable.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript", "python"],
    category: "Code Style",
    tags: ["configuration", "maintainability"]
  },
  {
    title: "Handle edge cases",
    description: "Think about what could go wrong.",
    content: "Handle edge cases: empty arrays, null values, network failures, timeouts. Think about what could go wrong and handle it gracefully. Don't assume everything will work perfectly.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Error Handling",
    tags: ["edge-cases", "reliability"]
  },
  {
    title: "Use environment-specific configs",
    description: "Separate configs for dev/staging/production.",
    content: "Use environment-specific configurations. Use .env files for local development, environment variables for deployment. Never hardcode environment-specific values.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Configuration",
    tags: ["configuration", "environments"]
  },
  {
    title: "Log appropriately",
    description: "Use appropriate log levels.",
    content: "Use appropriate log levels: DEBUG for development info, INFO for general events, WARN for warnings, ERROR for errors. Don't log sensitive information. Use structured logging when possible.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "General",
    tags: ["logging", "debugging"]
  },
  {
    title: "Use meaningful error messages",
    description: "Errors should help diagnose problems.",
    content: "Use meaningful error messages that help diagnose problems. Include context (what operation failed, what input was provided) when safe. Avoid generic messages like 'Error occurred'.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Error Handling",
    tags: ["errors", "debugging"]
  },
  {
    title: "Test critical user flows",
    description: "Test end-to-end user journeys.",
    content: "Test critical user flows end-to-end: signup, login, checkout, etc. Use E2E testing tools like Playwright or Cypress. These tests catch integration issues that unit tests miss.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Testing",
    tags: ["testing", "e2e"]
  },
  {
    title: "Use semantic HTML",
    description: "Use proper HTML elements for meaning.",
    content: "Use semantic HTML elements (header, nav, main, article, section, footer) instead of divs everywhere. This improves accessibility, SEO, and code readability.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["react", "nextjs"],
    category: "Accessibility",
    tags: ["html", "accessibility"]
  },
  {
    title: "Make forms accessible",
    description: "Use proper labels and ARIA attributes.",
    content: "Make forms accessible: use <label> elements, associate labels with inputs, provide error messages, use ARIA attributes when needed. Test with screen readers.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["react", "nextjs"],
    category: "Accessibility",
    tags: ["accessibility", "forms"]
  },
  {
    title: "Handle loading states",
    description: "Show feedback during async operations.",
    content: "Show loading states during async operations (API calls, form submissions). Use loading spinners, skeleton screens, or progress indicators. Don't leave users wondering if something is happening.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["react", "nextjs"],
    category: "UX",
    tags: ["ux", "loading"]
  },
  {
    title: "Provide feedback for user actions",
    description: "Confirm successful actions.",
    content: "Provide feedback for user actions: show success messages, error messages, or confirmations. Use toast notifications, inline messages, or modals. Users should know their actions were received.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["react", "nextjs"],
    category: "UX",
    tags: ["ux", "feedback"]
  },
  {
    title: "Use environment variables for configuration",
    description: "Never hardcode configuration values.",
    content: "Use environment variables for all configuration: API URLs, feature flags, limits, etc. Use libraries like dotenv for local development. Never hardcode values that differ between environments.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Configuration",
    tags: ["configuration", "environments"]
  },
  {
    title: "Validate environment variables at startup",
    description: "Fail fast if required env vars are missing.",
    content: "Validate all required environment variables at application startup. Fail fast with clear error messages if any are missing. Use libraries like zod or joi for validation.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Configuration",
    tags: ["configuration", "validation"]
  },
  {
    title: "Use connection pooling for databases",
    description: "Configure database connection pooling.",
    content: "Use connection pooling for database connections. Configure appropriate pool size based on your application's needs. This improves performance and prevents connection exhaustion.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Performance",
    tags: ["database", "performance"]
  },
  {
    title: "Implement request timeouts",
    description: "Set timeouts for external API calls.",
    content: "Set timeouts for all external API calls and database queries. Don't let requests hang indefinitely. Typical timeout: 5-30 seconds depending on the operation.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Error Handling",
    tags: ["timeouts", "reliability"]
  },
  {
    title: "Use transactions for related operations",
    description: "Group related database operations in transactions.",
    content: "Use database transactions for operations that must succeed or fail together. Example: creating a user and their profile. This ensures data consistency.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Database",
    tags: ["database", "transactions"]
  },
  {
    title: "Handle database connection errors",
    description: "Gracefully handle database connection failures.",
    content: "Handle database connection errors gracefully. Implement retry logic with exponential backoff. Show user-friendly error messages. Log errors for debugging.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Error Handling",
    tags: ["database", "errors"]
  },
  {
    title: "Use prepared statements",
    description: "Use prepared statements for repeated queries.",
    content: "Use prepared statements for queries that are executed multiple times with different parameters. This improves performance and prevents SQL injection.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Performance",
    tags: ["database", "performance"]
  },
  {
    title: "Normalize database schema",
    description: "Follow database normalization principles.",
    content: "Normalize database schema to reduce redundancy and improve data integrity. Use foreign keys and proper relationships. Denormalize only when performance requires it.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Database",
    tags: ["database", "design"]
  },
  {
    title: "Use migrations for schema changes",
    description: "Never modify database schema manually.",
    content: "Use database migrations for all schema changes. Never modify schema manually in production. Migrations should be reversible. Test migrations in staging first.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Database",
    tags: ["database", "migrations"]
  },
  {
    title: "Backup database regularly",
    description: "Implement automated database backups.",
    content: "Implement automated database backups. Test restore procedures regularly. Keep backups in multiple locations. Follow 3-2-1 backup strategy: 3 copies, 2 different media, 1 offsite.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Database",
    tags: ["database", "backups"]
  },
  {
    title: "Monitor application performance",
    description: "Set up performance monitoring and alerts.",
    content: "Set up performance monitoring: response times, error rates, database query times, memory usage. Use tools like Sentry, Datadog, or New Relic. Set up alerts for anomalies.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Monitoring",
    tags: ["monitoring", "performance"]
  },
  {
    title: "Use structured logging",
    description: "Log in structured format (JSON) for better parsing.",
    content: "Use structured logging (JSON format) instead of plain text. Include context: user ID, request ID, timestamp, log level. This makes log analysis and debugging easier.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Logging",
    tags: ["logging", "debugging"]
  },
  {
    title: "Don't log sensitive information",
    description: "Never log passwords, tokens, or PII.",
    content: "Never log sensitive information: passwords, API keys, tokens, credit card numbers, or personally identifiable information (PII). Sanitize logs before storing them.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Security",
    tags: ["security", "logging"]
  },
  {
    title: "Use content security policy",
    description: "Implement CSP headers to prevent XSS attacks.",
    content: "Use Content Security Policy (CSP) headers to prevent XSS attacks. Configure CSP to only allow scripts and resources from trusted sources. Use 'nonce' or 'hash' for inline scripts.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["nextjs"],
    category: "Security",
    tags: ["security", "xss"]
  },
  {
    title: "Implement CORS properly",
    description: "Configure CORS to allow only trusted origins.",
    content: "Configure CORS (Cross-Origin Resource Sharing) properly. Only allow requests from trusted origins. Don't use wildcard (*) in production. Set appropriate headers.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Security",
    tags: ["security", "cors"]
  },
  {
    title: "Use HTTPS everywhere",
    description: "Force HTTPS in production, redirect HTTP.",
    content: "Force HTTPS in production. Redirect all HTTP traffic to HTTPS. Use HSTS (HTTP Strict Transport Security) headers. Configure SSL/TLS properly.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Security",
    tags: ["security", "https"]
  },
  {
    title: "Implement proper authentication",
    description: "Use proven authentication libraries, don't roll your own.",
    content: "Use proven authentication libraries (next-auth, Passport.js, Auth0) instead of building your own. Authentication is complex and security-critical. Don't reinvent the wheel.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["nextjs", "typescript"],
    category: "Security",
    tags: ["security", "authentication"]
  },
  {
    title: "Hash passwords properly",
    description: "Use bcrypt or Argon2, never plain text or MD5.",
    content: "Hash passwords using bcrypt, Argon2, or similar secure hashing algorithms. Never store plain text passwords. Use salt and appropriate cost factors. Never use MD5 or SHA1.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Security",
    tags: ["security", "passwords"]
  },
  {
    title: "Use JWT tokens securely",
    description: "Set short expiration times and use refresh tokens.",
    content: "Use JWT tokens securely: set short expiration times (15-60 minutes), use refresh tokens for long-lived sessions, store tokens securely (httpOnly cookies), and validate tokens properly.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Security",
    tags: ["security", "jwt"]
  },
  {
    title: "Implement authorization checks",
    description: "Check permissions for every protected action.",
    content: "Implement authorization checks for every protected action. Don't rely solely on authentication. Check if the user has permission to perform the action. Use role-based access control (RBAC) when appropriate.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Security",
    tags: ["security", "authorization"]
  },
  {
    title: "Validate file types on upload",
    description: "Check file extensions and MIME types.",
    content: "Validate file types on upload by checking both file extension and MIME type. Don't trust file extensions alone. Use a library to detect actual file type. Reject unknown types.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Security",
    tags: ["security", "uploads"]
  },
  {
    title: "Limit file upload sizes",
    description: "Set maximum file size limits.",
    content: "Set maximum file size limits for uploads. Reject files that exceed the limit. This prevents DoS attacks and storage issues. Typical limit: 5-10MB for images, 50MB for documents.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Security",
    tags: ["security", "uploads"]
  },
  {
    title: "Use CSRF protection",
    description: "Protect against cross-site request forgery attacks.",
    content: "Use CSRF (Cross-Site Request Forgery) protection for state-changing operations. Use CSRF tokens or SameSite cookie attributes. Libraries like next-auth handle this automatically.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["nextjs"],
    category: "Security",
    tags: ["security", "csrf"]
  },
  {
    title: "Keep dependencies updated",
    description: "Regularly update dependencies for security patches.",
    content: "Regularly update dependencies to get security patches. Use tools like Dependabot or Renovate. Test updates in staging before production. Prioritize security updates.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Security",
    tags: ["security", "dependencies"]
  },
  {
    title: "Use linters and formatters",
    description: "Configure ESLint, Prettier, or similar tools.",
    content: "Use linters (ESLint, Pylint) and formatters (Prettier, Black) to maintain code quality and consistency. Configure them in your project and run them in CI/CD. Fix warnings and errors.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript", "python"],
    category: "Code Quality",
    tags: ["linting", "formatting"]
  },
  {
    title: "Run tests in CI/CD",
    description: "Automate testing in your deployment pipeline.",
    content: "Run tests automatically in CI/CD pipeline. Fail the build if tests fail. Run tests on every pull request. This catches bugs before they reach production.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Testing",
    tags: ["testing", "ci-cd"]
  },
  {
    title: "Use feature flags",
    description: "Deploy features behind feature flags.",
    content: "Use feature flags to deploy features gradually. This allows you to test in production, roll back quickly, and enable features for specific users. Use services like LaunchDarkly or build your own.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Deployment",
    tags: ["features", "deployment"]
  },
  {
    title: "Implement health checks",
    description: "Add health check endpoints for monitoring.",
    content: "Implement health check endpoints (/health, /ready) that return the application status. Use these for load balancer health checks and monitoring. Check database connectivity, external services, etc.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["nextjs", "typescript"],
    category: "Monitoring",
    tags: ["monitoring", "health"]
  },
  {
    title: "Use CDN for static assets",
    description: "Serve static assets from a CDN.",
    content: "Serve static assets (images, CSS, JS) from a CDN (Content Delivery Network). This reduces server load and improves load times for users worldwide. Use services like Cloudflare, AWS CloudFront, or Vercel Edge Network.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Performance",
    tags: ["performance", "cdn"]
  },
  {
    title: "Minify and compress assets",
    description: "Minify JavaScript and CSS, enable compression.",
    content: "Minify JavaScript and CSS files. Enable gzip or brotli compression on the server. This reduces file sizes and improves load times. Most build tools do this automatically.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["nextjs"],
    category: "Performance",
    tags: ["performance", "optimization"]
  },
  {
    title: "Use browser caching",
    description: "Set appropriate cache headers for static assets.",
    content: "Set appropriate cache headers for static assets. Use long cache times (1 year) with versioned filenames for immutable assets. Use shorter cache times for HTML. Use ETags for validation.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["nextjs"],
    category: "Performance",
    tags: ["performance", "caching"]
  },
  {
    title: "Optimize database queries",
    description: "Avoid N+1 queries, use eager loading.",
    content: "Optimize database queries: avoid N+1 queries, use eager loading, select only needed columns, use indexes. Profile slow queries and optimize them. Use query builders or ORMs that help prevent common issues.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Performance",
    tags: ["database", "performance"]
  },
  {
    title: "Use pagination for large lists",
    description: "Don't load all data at once.",
    content: "Use pagination, infinite scroll, or cursor-based pagination for large lists. Don't load all data at once. This improves performance and user experience. Typical page size: 20-50 items.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["react", "nextjs"],
    category: "Performance",
    tags: ["performance", "ux"]
  },
  {
    title: "Implement request deduplication",
    description: "Prevent duplicate API calls.",
    content: "Implement request deduplication to prevent duplicate API calls. Use libraries like React Query or SWR that handle this automatically. Cache requests with the same parameters.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["react", "nextjs"],
    category: "Performance",
    tags: ["performance", "caching"]
  },
  {
    title: "Use Web Workers for heavy computations",
    description: "Offload heavy work to Web Workers.",
    content: "Use Web Workers for heavy computations that would block the main thread. Examples: image processing, data parsing, complex calculations. Keep the UI responsive.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["react", "javascript"],
    category: "Performance",
    tags: ["performance", "workers"]
  },
  {
    title: "Monitor bundle size",
    description: "Keep JavaScript bundle size reasonable.",
    content: "Monitor JavaScript bundle size. Use tools like webpack-bundle-analyzer. Aim for initial bundle under 200KB gzipped. Code split routes and heavy dependencies. Remove unused code.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["nextjs", "react"],
    category: "Performance",
    tags: ["performance", "bundling"]
  },
  {
    title: "Test on multiple browsers",
    description: "Test your app on major browsers.",
    content: "Test your application on multiple browsers (Chrome, Firefox, Safari, Edge) and devices (desktop, tablet, mobile). Use browser testing tools or services like BrowserStack. Fix browser-specific issues.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["react", "nextjs"],
    category: "Testing",
    tags: ["testing", "browsers"]
  },
  {
    title: "Use semantic versioning",
    description: "Follow semver for version numbers.",
    content: "Use semantic versioning (semver) for version numbers: MAJOR.MINOR.PATCH. Increment MAJOR for breaking changes, MINOR for new features, PATCH for bug fixes. Tag releases in git.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Versioning",
    tags: ["versioning", "releases"]
  },
  {
    title: "Write changelog",
    description: "Maintain a changelog for releases.",
    content: "Maintain a CHANGELOG.md file documenting all changes in each release. Include new features, bug fixes, and breaking changes. This helps users understand what changed.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Documentation",
    tags: ["documentation", "releases"]
  },
  {
    title: "Use meaningful branch names",
    description: "Follow a branching strategy.",
    content: "Use meaningful branch names that describe the work. Follow a branching strategy (Git Flow, GitHub Flow). Use prefixes: feature/, fix/, hotfix/. Keep branch names short and descriptive.",
    tools: ["cursor", "claude_code", "copilot", "windsurf"],
    task_types: ["production"],
    stacks: [],
    category: "Git",
    tags: ["git", "branches"]
  },
  {
    title: "Review code before merging",
    description: "Require code reviews for all changes.",
    content: "Require code reviews for all changes before merging to main/master. Use pull requests. Review for correctness, style, security, and performance. At least one approval required.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Process",
    tags: ["review", "quality"]
  },
  {
    title: "Use issue tracking",
    description: "Track bugs and features in an issue tracker.",
    content: "Use issue tracking (GitHub Issues, Jira, Linear) to track bugs, features, and tasks. Link commits to issues. Use issue templates. This helps organize work and track progress.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Process",
    tags: ["process", "tracking"]
  },
  {
    title: "Document API changes",
    description: "Document breaking changes and migrations.",
    content: "Document API changes, especially breaking changes. Provide migration guides. Use API versioning if needed. Give users time to adapt before removing deprecated features.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Documentation",
    tags: ["documentation", "api"]
  },
  {
    title: "Use dependency injection",
    description: "Inject dependencies instead of importing directly.",
    content: "Use dependency injection for better testability and flexibility. Inject dependencies (services, repositories) instead of importing them directly. This makes code easier to test and modify.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript"],
    category: "Code Style",
    tags: ["architecture", "testing"]
  },
  {
    title: "Separate concerns",
    description: "Keep business logic separate from presentation.",
    content: "Separate concerns: keep business logic separate from presentation, data access separate from business logic. Use layered architecture (presentation, business, data). This improves maintainability.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript"],
    category: "Architecture",
    tags: ["architecture", "separation"]
  },
  {
    title: "Use design patterns appropriately",
    description: "Apply design patterns when they solve real problems.",
    content: "Use design patterns (Factory, Strategy, Observer, etc.) when they solve real problems. Don't over-engineer. Patterns should make code clearer, not more complex.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript"],
    category: "Architecture",
    tags: ["patterns", "architecture"]
  },
  {
    title: "Avoid global state",
    description: "Minimize global state, use local state when possible.",
    content: "Avoid global state when possible. Use local component state, props, or context for shared state. Global state makes code harder to reason about and test. Use it only when necessary.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["react"],
    category: "Code Style",
    tags: ["state", "architecture"]
  },
  {
    title: "Use TypeScript strict mode",
    description: "Enable all strict type checking options.",
    content: "Enable TypeScript strict mode and all strict type checking options. This catches more errors at compile time. Fix type errors properly, don't use 'any' as a workaround.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript"],
    category: "Code Style",
    tags: ["typescript", "types"]
  },
  {
    title: "Avoid any type",
    description: "Use unknown instead of any when type is truly unknown.",
    content: "Avoid using 'any' type in TypeScript. Use 'unknown' when the type is truly unknown, then narrow it with type guards. Use proper types or generics. 'any' defeats the purpose of TypeScript.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["typescript"],
    category: "Code Style",
    tags: ["typescript", "types"]
  },
  {
    title: "Use generics for reusable code",
    description: "Use TypeScript generics for type-safe reusable functions.",
    content: "Use TypeScript generics for type-safe reusable functions and components. Generics allow you to write code that works with multiple types while maintaining type safety.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["typescript"],
    category: "Code Style",
    tags: ["typescript", "generics"]
  },
  {
    title: "Define interfaces for data structures",
    description: "Create interfaces for objects and API responses.",
    content: "Define TypeScript interfaces for data structures, API responses, and function parameters. This provides type safety and serves as documentation. Export interfaces for reuse.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript"],
    category: "Code Style",
    tags: ["typescript", "types"]
  },
  {
    title: "Use const assertions",
    description: "Use 'as const' for immutable arrays and objects.",
    content: "Use 'as const' assertion for arrays and objects that shouldn't change. This provides better type inference and prevents accidental mutations. Example: const colors = ['red', 'blue'] as const;",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["typescript"],
    category: "Code Style",
    tags: ["typescript", "immutability"]
  },
  {
    title: "Use discriminated unions",
    description: "Use discriminated unions for type-safe state machines.",
    content: "Use TypeScript discriminated unions for type-safe state machines and variant types. Add a 'type' or 'kind' field to distinguish between variants. This provides excellent type safety.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["typescript"],
    category: "Code Style",
    tags: ["typescript", "types"]
  },
  {
    title: "Prefer composition over inheritance",
    description: "Use composition and interfaces instead of inheritance.",
    content: "Prefer composition over inheritance. Use interfaces and composition to build complex objects. Inheritance creates tight coupling and makes code harder to change. Composition is more flexible.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript"],
    category: "Architecture",
    tags: ["architecture", "design"]
  },
  {
    title: "Use factory functions",
    description: "Use factory functions for object creation.",
    content: "Use factory functions for object creation when you need complex initialization logic. Factories encapsulate creation logic and can return different types based on parameters.",
    tools: ["cursor", "claude_code"],
    task_types: ["production", "refactor"],
    stacks: ["typescript", "javascript"],
    category: "Code Style",
    tags: ["patterns", "creation"]
  },
  {
    title: "Implement retry logic with exponential backoff",
    description: "Retry failed operations with increasing delays.",
    content: "Implement retry logic with exponential backoff for transient failures (network errors, timeouts). Start with short delays and increase exponentially. Set maximum retry count. Don't retry on permanent failures.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Error Handling",
    tags: ["errors", "reliability"]
  },
  {
    title: "Use circuit breakers",
    description: "Implement circuit breakers for external services.",
    content: "Implement circuit breakers for external service calls. When a service fails repeatedly, stop calling it temporarily. This prevents cascading failures and allows services to recover.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Error Handling",
    tags: ["errors", "reliability"]
  },
  {
    title: "Handle partial failures gracefully",
    description: "Design systems to handle partial failures.",
    content: "Design systems to handle partial failures gracefully. If one feature fails, don't break the entire application. Use try-catch blocks, fallbacks, and graceful degradation.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Error Handling",
    tags: ["errors", "reliability"]
  },
  {
    title: "Use idempotent operations",
    description: "Design operations to be idempotent.",
    content: "Design operations to be idempotent when possible. Idempotent operations can be safely retried without side effects. Use unique identifiers or tokens to prevent duplicate processing.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Architecture",
    tags: ["architecture", "reliability"]
  },
  {
    title: "Implement proper error boundaries",
    description: "Catch and handle errors at appropriate levels.",
    content: "Implement error boundaries at appropriate levels: React error boundaries for UI, try-catch for async operations, global error handlers for unhandled errors. Log errors and show user-friendly messages.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["react", "typescript"],
    category: "Error Handling",
    tags: ["errors", "react"]
  },
  {
    title: "Use feature toggles",
    description: "Deploy features behind toggles for gradual rollout.",
    content: "Use feature toggles (feature flags) to deploy features gradually. This allows testing in production, quick rollbacks, and A/B testing. Use environment variables or feature flag services.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Deployment",
    tags: ["features", "deployment"]
  },
  {
    title: "Version your APIs",
    description: "Version APIs to support multiple clients.",
    content: "Version your APIs (URL versioning: /v1/users, header versioning: Accept: application/vnd.api+json;version=1). This allows you to evolve APIs without breaking existing clients.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "API",
    tags: ["api", "versioning"]
  },
  {
    title: "Use API rate limiting",
    description: "Implement rate limiting to prevent abuse.",
    content: "Implement API rate limiting to prevent abuse and ensure fair usage. Set limits per API key, IP address, or user. Return appropriate HTTP status codes (429 Too Many Requests) when limits are exceeded.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "API",
    tags: ["api", "rate-limiting"]
  },
  {
    title: "Return consistent API responses",
    description: "Use consistent response format across all endpoints.",
    content: "Use consistent API response format across all endpoints. Include status, data, and error fields. Use standard HTTP status codes. This makes API consumption easier and more predictable.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "API",
    tags: ["api", "consistency"]
  },
  {
    title: "Validate API request bodies",
    description: "Validate all API request bodies.",
    content: "Validate all API request bodies using libraries like Zod, Yup, or Joi. Return clear validation error messages. Don't trust client input. Validate types, formats, and business rules.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "API",
    tags: ["api", "validation"]
  },
  {
    title: "Use pagination for list endpoints",
    description: "Implement pagination for endpoints that return lists.",
    content: "Implement pagination for endpoints that return lists. Use offset/limit or cursor-based pagination. Include pagination metadata (total count, has more, next cursor) in responses.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "API",
    tags: ["api", "pagination"]
  },
  {
    title: "Implement API authentication",
    description: "Require authentication for protected endpoints.",
    content: "Require authentication for protected API endpoints. Use API keys, JWT tokens, or OAuth. Validate tokens on every request. Return 401 Unauthorized for invalid or missing credentials.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "API",
    tags: ["api", "authentication"]
  },
  {
    title: "Use HTTPS for all API calls",
    description: "Never use HTTP for API calls in production.",
    content: "Always use HTTPS for API calls in production. Never send sensitive data over HTTP. Use TLS 1.2 or higher. Configure certificates properly. Redirect HTTP to HTTPS.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Security",
    tags: ["security", "https"]
  },
  {
    title: "Implement request/response logging",
    description: "Log API requests and responses for debugging.",
    content: "Log API requests and responses (sanitize sensitive data) for debugging and monitoring. Include request ID, timestamp, method, path, status code, and duration. Use structured logging.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Logging",
    tags: ["logging", "api"]
  },
  {
    title: "Use API documentation tools",
    description: "Generate API documentation automatically.",
    content: "Use API documentation tools (OpenAPI/Swagger, Postman, Insomnia) to generate and maintain API documentation. Keep documentation up to date. Include examples and error responses.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Documentation",
    tags: ["documentation", "api"]
  },
  {
    title: "Handle CORS properly",
    description: "Configure CORS headers correctly.",
    content: "Configure CORS (Cross-Origin Resource Sharing) headers correctly. Only allow trusted origins. Don't use wildcard (*) in production. Set appropriate headers (Access-Control-Allow-Origin, Access-Control-Allow-Methods).",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Security",
    tags: ["security", "cors"]
  },
  {
    title: "Use API gateway",
    description: "Use API gateway for microservices.",
    content: "Use API gateway for microservices architecture. It provides routing, load balancing, authentication, rate limiting, and monitoring in one place. Use services like Kong, AWS API Gateway, or build your own.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Architecture",
    tags: ["architecture", "api"]
  },
  {
    title: "Implement API versioning",
    description: "Version APIs to support evolution.",
    content: "Version APIs to support evolution without breaking existing clients. Use URL versioning (/v1/, /v2/) or header versioning. Deprecate old versions gradually with migration guides.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "API",
    tags: ["api", "versioning"]
  },
  {
    title: "Use message queues",
    description: "Use queues for async processing.",
    content: "Use message queues (RabbitMQ, Redis, AWS SQS) for asynchronous processing. Decouple services, handle spikes in load, and improve reliability. Process jobs in background workers.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Architecture",
    tags: ["architecture", "queues"]
  },
  {
    title: "Implement event-driven architecture",
    description: "Use events for loose coupling.",
    content: "Use event-driven architecture for loose coupling between services. Services communicate through events. This improves scalability and allows services to evolve independently.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Architecture",
    tags: ["architecture", "events"]
  },
  {
    title: "Use caching strategically",
    description: "Cache data at appropriate levels.",
    content: "Use caching strategically: browser cache, CDN cache, application cache (Redis, Memcached), database query cache. Cache frequently accessed, rarely changing data. Set appropriate TTLs.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Performance",
    tags: ["performance", "caching"]
  },
  {
    title: "Implement cache invalidation",
    description: "Invalidate cache when data changes.",
    content: "Implement cache invalidation strategy. Invalidate cache when data changes. Use cache tags, TTLs, or event-driven invalidation. Stale cache can cause serious bugs.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Performance",
    tags: ["performance", "caching"]
  },
  {
    title: "Use database connection pooling",
    description: "Pool database connections for efficiency.",
    content: "Use database connection pooling to reuse connections. Configure appropriate pool size based on your application's needs. This improves performance and prevents connection exhaustion.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Performance",
    tags: ["database", "performance"]
  },
  {
    title: "Optimize database queries",
    description: "Write efficient database queries.",
    content: "Write efficient database queries: use indexes, avoid N+1 queries, select only needed columns, use joins appropriately, avoid SELECT *. Profile and optimize slow queries.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Performance",
    tags: ["database", "performance"]
  },
  {
    title: "Use read replicas",
    description: "Use read replicas for read-heavy workloads.",
    content: "Use database read replicas for read-heavy workloads. Distribute read queries across replicas. Keep writes on primary. This improves performance and availability.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Performance",
    tags: ["database", "performance"]
  },
  {
    title: "Implement database migrations",
    description: "Use migrations for all schema changes.",
    content: "Use database migrations for all schema changes. Never modify schema manually. Migrations should be reversible. Test migrations in staging. Use migration tools (Prisma, Alembic, Flyway).",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Database",
    tags: ["database", "migrations"]
  },
  {
    title: "Backup databases regularly",
    description: "Automate database backups.",
    content: "Automate database backups. Test restore procedures regularly. Keep backups in multiple locations (3-2-1 strategy). Set up point-in-time recovery if possible. Document recovery procedures.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Database",
    tags: ["database", "backups"]
  },
  {
    title: "Monitor database performance",
    description: "Track database metrics.",
    content: "Monitor database performance: query times, connection counts, slow queries, lock waits, disk usage. Set up alerts for anomalies. Use database monitoring tools.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Monitoring",
    tags: ["monitoring", "database"]
  },
  {
    title: "Use database transactions",
    description: "Use transactions for atomic operations.",
    content: "Use database transactions for operations that must succeed or fail together. This ensures data consistency. Keep transactions short to avoid locking. Handle deadlocks properly.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Database",
    tags: ["database", "transactions"]
  },
  {
    title: "Normalize database schema",
    description: "Follow normalization principles.",
    content: "Normalize database schema to reduce redundancy and improve data integrity. Use foreign keys and proper relationships. Denormalize only when performance requires it and document why.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Database",
    tags: ["database", "design"]
  },
  {
    title: "Use appropriate data types",
    description: "Choose correct data types for columns.",
    content: "Use appropriate data types for database columns. Use INTEGER for numbers, TEXT for strings, TIMESTAMP for dates, BOOLEAN for flags. Don't store everything as TEXT or VARCHAR.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Database",
    tags: ["database", "design"]
  },
  {
    title: "Add database indexes",
    description: "Index columns used in queries.",
    content: "Add database indexes to columns used in WHERE clauses, JOINs, and ORDER BY. Don't over-index (indexes slow down writes). Monitor query performance and add indexes as needed.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Performance",
    tags: ["database", "performance"]
  },
  {
    title: "Use foreign keys",
    description: "Enforce referential integrity with foreign keys.",
    content: "Use foreign keys to enforce referential integrity. This prevents orphaned records and ensures data consistency. Set appropriate ON DELETE and ON UPDATE actions.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Database",
    tags: ["database", "integrity"]
  },
  {
    title: "Implement soft deletes",
    description: "Use soft deletes when data recovery might be needed.",
    content: "Use soft deletes (deleted_at timestamp) instead of hard deletes when data recovery might be needed. Filter out soft-deleted records in queries. Hard delete after retention period.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Database",
    tags: ["database", "deletes"]
  },
  {
    title: "Use database constraints",
    description: "Enforce data integrity with constraints.",
    content: "Use database constraints (NOT NULL, UNIQUE, CHECK) to enforce data integrity at the database level. Don't rely solely on application-level validation. Constraints prevent bad data.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Database",
    tags: ["database", "integrity"]
  },
  {
    title: "Avoid database locks",
    description: "Minimize lock contention.",
    content: "Avoid database locks by keeping transactions short, using appropriate isolation levels, and avoiding long-running queries. Use SELECT FOR UPDATE only when necessary.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Database",
    tags: ["database", "performance"]
  },
  {
    title: "Use database views",
    description: "Use views for complex queries.",
    content: "Use database views for complex queries that are used frequently. Views simplify queries and can improve performance. Use materialized views for expensive computations.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Database",
    tags: ["database", "performance"]
  },
  {
    title: "Implement database sharding",
    description: "Shard database for horizontal scaling.",
    content: "Implement database sharding for horizontal scaling when single database becomes a bottleneck. Shard by user ID, geographic region, or other criteria. This is complex, use only when needed.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Database",
    tags: ["database", "scaling"]
  },
  {
    title: "Use database replication",
    description: "Replicate database for high availability.",
    content: "Use database replication for high availability and read scaling. Set up master-slave or master-master replication. Use read replicas for read-heavy workloads.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Database",
    tags: ["database", "availability"]
  },
  {
    title: "Monitor database size",
    description: "Track database growth.",
    content: "Monitor database size and growth rate. Set up alerts for size thresholds. Implement data archival or purging strategies. Large databases are slower and harder to backup.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Monitoring",
    tags: ["monitoring", "database"]
  },
  {
    title: "Use database connection strings securely",
    description: "Store connection strings in environment variables.",
    content: "Store database connection strings in environment variables, not in code. Use connection string builders. Rotate credentials regularly. Use different credentials for different environments.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Security",
    tags: ["security", "database"]
  },
  {
    title: "Implement database access control",
    description: "Limit database access to necessary users.",
    content: "Implement database access control. Create separate users for different applications. Grant minimum necessary permissions. Use read-only users for reporting. Audit access logs.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Security",
    tags: ["security", "database"]
  },
  {
    title: "Encrypt sensitive database fields",
    description: "Encrypt sensitive data at rest.",
    content: "Encrypt sensitive database fields (passwords, credit cards, PII) at rest. Use database encryption or application-level encryption. Use strong encryption algorithms. Protect encryption keys.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Security",
    tags: ["security", "encryption"]
  },
  {
    title: "Use parameterized queries",
    description: "Always use parameterized queries.",
    content: "Always use parameterized queries or prepared statements. Never concatenate user input into SQL queries. This prevents SQL injection attacks. Use ORMs that handle this automatically.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Security",
    tags: ["security", "sql-injection"]
  },
  {
    title: "Sanitize database inputs",
    description: "Sanitize all database inputs.",
    content: "Sanitize all database inputs. Validate data types, lengths, and formats. Reject invalid data. Use whitelist validation when possible. Don't trust user input.",
    tools: ["cursor", "claude_code", "copilot"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Security",
    tags: ["security", "validation"]
  },
  {
    title: "Use database audit logs",
    description: "Log database access and changes.",
    content: "Use database audit logs to track who accessed what data and when. Enable audit logging for sensitive tables. Review logs regularly. This helps with compliance and security.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Security",
    tags: ["security", "audit"]
  },
  {
    title: "Implement database backup encryption",
    description: "Encrypt database backups.",
    content: "Encrypt database backups. Backups contain sensitive data and should be protected. Use strong encryption. Store encryption keys separately from backups.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Security",
    tags: ["security", "backups"]
  },
  {
    title: "Test database restore procedures",
    description: "Regularly test database restore procedures.",
    content: "Regularly test database restore procedures. Backups are useless if you can't restore them. Test restores in a separate environment. Document restore procedures. Time restore operations.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Database",
    tags: ["database", "backups"]
  },
  {
    title: "Use database connection pooling",
    description: "Pool database connections.",
    content: "Use database connection pooling to reuse connections efficiently. Configure appropriate pool size. Monitor pool usage. This improves performance and prevents connection exhaustion.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Performance",
    tags: ["database", "performance"]
  },
  {
    title: "Optimize database indexes",
    description: "Create and maintain appropriate indexes.",
    content: "Create and maintain appropriate database indexes. Index columns used in WHERE, JOIN, and ORDER BY clauses. Don't over-index. Monitor index usage and remove unused indexes.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Performance",
    tags: ["database", "performance"]
  },
  {
    title: "Use database query caching",
    description: "Cache frequently executed queries.",
    content: "Use database query caching for frequently executed queries with same parameters. Use application-level caching (Redis) or database query cache. Set appropriate TTLs.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Performance",
    tags: ["database", "caching"]
  },
  {
    title: "Monitor slow database queries",
    description: "Identify and optimize slow queries.",
    content: "Monitor slow database queries. Use database slow query logs or APM tools. Identify queries taking longer than threshold (e.g., 100ms). Optimize or add indexes. Set up alerts.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Performance",
    tags: ["database", "performance"]
  },
  {
    title: "Use database connection timeouts",
    description: "Set connection and query timeouts.",
    content: "Set database connection and query timeouts. Don't let queries hang indefinitely. Typical timeouts: connection 10s, query 30s. Adjust based on your use case.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Performance",
    tags: ["database", "timeouts"]
  },
  {
    title: "Implement database connection retry",
    description: "Retry database connections on failure.",
    content: "Implement database connection retry logic with exponential backoff. Transient network issues can cause connection failures. Retry a few times before giving up.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Error Handling",
    tags: ["database", "errors"]
  },
  {
    title: "Use database connection health checks",
    description: "Check database connectivity periodically.",
    content: "Implement database connection health checks. Check connectivity periodically and before critical operations. Fail fast if database is unavailable. Use for load balancer health checks.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript"],
    category: "Monitoring",
    tags: ["monitoring", "database"]
  },
  {
    title: "Use database connection string validation",
    description: "Validate connection strings at startup.",
    content: "Validate database connection strings at application startup. Test connectivity. Fail fast with clear error messages if connection string is invalid or database is unreachable.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Configuration",
    tags: ["database", "validation"]
  },
  {
    title: "Implement database connection pooling monitoring",
    description: "Monitor connection pool usage.",
    content: "Monitor database connection pool usage: active connections, idle connections, wait time for connections. Set up alerts for pool exhaustion. Adjust pool size based on metrics.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Monitoring",
    tags: ["monitoring", "database"]
  },
  {
    title: "Use database connection string rotation",
    description: "Rotate database credentials regularly.",
    content: "Rotate database credentials regularly (every 90 days or as per policy). Update connection strings in all applications. Use credential management services. Document rotation procedures.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Security",
    tags: ["security", "database"]
  },
  {
    title: "Implement database connection string encryption",
    description: "Encrypt connection strings at rest.",
    content: "Encrypt database connection strings at rest. Don't store plain text connection strings. Use secret management services (AWS Secrets Manager, HashiCorp Vault). Decrypt at runtime.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: [],
    category: "Security",
    tags: ["security", "database"]
  },
  {
    title: "Use database connection string validation",
    description: "Validate connection strings before use.",
    content: "Validate database connection strings before use. Check format, required fields, and connectivity. Fail fast with clear error messages. Don't proceed with invalid connection strings.",
    tools: ["cursor", "claude_code"],
    task_types: ["production"],
    stacks: ["typescript", "javascript", "python"],
    category: "Configuration",
    tags: ["database", "validation"]
  }
];
