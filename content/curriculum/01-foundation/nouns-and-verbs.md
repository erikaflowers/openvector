---
slug: nouns-and-verbs
title: Nouns & Verbs
subtitle: What are the things? What do the things do?
duration: 18 min
status: available
badge: new
updatedAt: '2026-02-14'
knowledgeCheck:
  - question: In the Nouns & Verbs exercise, what do nouns represent in a software system and what do verbs represent? Why is this mapping more than just a metaphor?
    hint: Think about database tables, API endpoints, and user actions. Where do the nouns end up? Where do the verbs end up?
  - question: Why does identifying nouns first, before writing any code, help you build a better system? What goes wrong if you skip this step and jump straight into building features?
  - question: The lesson mentions "hidden verbs" like Edit, Delete, and Undo that are implied by every Create action. Why are these easy to miss, and what happens to your users if you forget them?
    hint: Think about CRUD (Create, Read, Update, Delete). If you build Create but forget Delete, what is the user experience?
  - question: How does the Nouns & Verbs exercise improve your AI prompts? What is the difference between telling Claude Code "build me a recipe app" versus describing the specific nouns and verbs?
---

## The Most Powerful Design Exercise

Before you write code, before you sketch wireframes, before you touch any tool, there is one exercise that will clarify your thinking more than anything else. We call it Nouns & Verbs.

It works like this: describe what your application does in plain language. Then underline the nouns; those are your data objects. Underline the verbs; those are your actions and functions. You have just drafted a system architecture using nothing but your natural language instincts.

This is not a cute metaphor. This is literally how experienced engineers think about system design. The nouns become your database tables, your components, your types. The verbs become your API endpoints, your event handlers, your user flows.

> If you can describe what your software does in two paragraphs, you can extract a working architecture from those paragraphs. The nouns are what you store. The verbs are what you build.

## How It Works

Start by writing a plain-language description of your project. Do not think about technology. Do not think about code. Write it like you are explaining it to a friend over coffee.

Example: "A recipe app where users can create an account, save their favorite recipes, and organize them into collections. Each recipe has a title, ingredients, steps, and a photo. Users can search for recipes by ingredient or name, share recipes with friends, and leave comments."

Now extract the nouns: User, Account, Recipe, Collection, Title, Ingredients, Steps, Photo, Comment. These are your entities, the things your system knows about and stores.

Extract the verbs: Create (account), Save, Organize, Search, Share, Leave (comment). These are your actions, the things users and the system can do.

You now have a rough data model and a rough feature set. From two sentences.

```
# The description:
# "Users can create recipes, organize them into collections,
#  search by ingredient, and share with friends."

# Nouns → Data (what you store)
User          → users table
Recipe        → recipes table
Collection    → collections table
Ingredient    → ingredients (part of recipe)
Friend        → relationships between users

# Verbs → Features (what you build)
Create        → POST /api/recipes (form + API endpoint)
Organize      → drag-and-drop UI + collection assignments
Search        → search bar + query endpoint
Share         → share link generation + permissions
```

## Nouns Become Structure

Each noun in your description maps to something concrete in your codebase:

Core nouns become database tables or data models. "Recipe" is a table with columns for title, description, cook time, and so on. "User" is a table with email, name, and hashed password.

Descriptive nouns become properties or fields. "Title," "Ingredients," and "Steps" are not their own tables; they are fields on the Recipe table.

Relationship nouns reveal connections. "Collection" implies a relationship between users and recipes: a user owns collections, collections contain recipes. This is a many-to-many relationship, and spotting it early saves you from painful database restructuring later.

The hierarchy of nouns tells you about your information architecture. Users contain collections which contain recipes. That is your navigation structure right there.

## Verbs Become Features

Each verb maps to user-facing functionality:

"Create" means a form, a submit button, validation, an API endpoint that writes to the database, and a success state. That is an entire feature described by one verb.

"Search" means an input field, a query that runs against the database, a results list, empty states (no results), and loading states. Another complete feature.

"Share" means generating a URL, deciding on permissions (can the recipient edit or only view?), sending a notification, and handling the receiving end.

When you list out every verb, you have a feature backlog. When you prioritize those verbs, you have a roadmap. "Create" and "Search" are probably essential. "Share" might be a later phase. One exercise, and you know what to build first.

## Hidden Nouns and Verbs

Your initial description will miss things. That is expected. The power of the exercise is what the gaps reveal.

Hidden nouns: Does the recipe app have Categories? Tags? Ratings? Dietary restrictions? Cooking difficulty levels? These are nouns that your users will expect but that you did not mention in your description. They represent scope you have not accounted for.

Hidden verbs: Can users edit a recipe after creating it? Can they delete one? Can they duplicate a collection? Undo a share? These are verbs that exist implicitly. Every "Create" usually implies "Read, Update, Delete" as well (the famous CRUD operations).

System verbs are actions the system performs without user input: validate (check that the recipe has all required fields), authenticate (verify the user is logged in), notify (tell someone their recipe was shared), index (make the recipe searchable). These are the invisible verbs that make the visible ones work.

## From Nouns & Verbs to AI Prompts

This exercise is especially powerful when working with AI coding tools. The better you can describe what you are building in structured language, the better your AI collaborator can help.

Instead of telling Claude Code "build me a recipe app," you can say: "I need a `Recipe` data model with `title`, `ingredients` (array of strings), `steps` (array of strings), `cookTime` (integer, minutes), and `authorId` (foreign key to `Users`). Create a REST API with endpoints for creating, reading, updating, and deleting recipes. Add a search endpoint that filters by ingredient."

That prompt came directly from the Nouns & Verbs exercise. You identified the nouns (Recipe, with its fields), identified the verbs (create, read, update, delete, search), and translated them into specific technical requirements. The AI now has clear instructions instead of vibes.

## Nouns & Verbs in Zero Vector

In Zero Vector, nouns and verbs become the foundation of your data model and your API design. When you hand an AI agent a clear list of entities (nouns) and the actions they perform or receive (verbs), you are giving it the vocabulary of your system.

This matters because AI agents are remarkably good at building CRUD operations, API endpoints, and database schemas when the entities are well-defined. They struggle when the entities are fuzzy. "Build me a recipe app" produces mediocre results. "Build me an app with Recipes, Ingredients, Collections, and Shopping Lists, where users can scale recipes, search by ingredient, and generate shopping lists from selected recipes" produces something you can actually ship. The nouns and verbs are the prompt.

:::exercise{title="Extract Your Architecture"}
- Think of a project you want to build, or use this prompt: "A personal finance tracker where users log expenses, categorize spending, set monthly budgets, and view reports showing where their money goes."
- Write two or three sentences describing it
- Underline every noun. Underline every verb.
- List the nouns on the left side of a page and the verbs on the right
- Draw lines connecting verbs to the nouns they act on
- Now look at your nouns list; those are your database tables
- Look at your verbs list; those are your features
- You just designed the skeleton of an application in five minutes.
:::

:::resources{title="Go Deeper"}
- [Domain-Driven Design Quickly](https://www.infoq.com/minibooks/domain-driven-design-quickly/): A free minibook introducing DDD, the professional version of Nouns & Verbs. Focuses on modeling real domains.
- [Object-Oriented Analysis and Design (Head First)](https://www.oreilly.com/library/view/head-first-object-oriented/0596008678/): A visual, beginner-friendly take on turning requirements into object models.
- [Event Storming](https://www.eventstorming.com/): A collaborative workshop technique for discovering the verbs (events) in a system. Used by professional architects.
- [React: Describing the UI](https://react.dev/learn/describing-the-ui): How React turns the "nouns" of your interface into a component tree.
:::
