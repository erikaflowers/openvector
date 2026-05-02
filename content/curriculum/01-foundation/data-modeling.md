---
slug: data-modeling
title: Data Modeling
subtitle: The shape of your data is the shape of your product.
duration: 20 min
status: available
badge: new
updatedAt: '2026-02-14'
---

## What Is a Data Model?

A data model is a description of what your application knows. Not what it does, but what it knows. A recipe app knows about recipes, users, ingredients, and collections. A social network knows about people, posts, friendships, and reactions. An LMS knows about courses, lessons, students, and progress.

The data model is the foundation everything else rests on. Your UI displays data. Your API serves data. Your logic transforms data. If the data model is wrong, everything built on top of it will fight you.

This is why experienced engineers start with the data model before writing a single component. Get the shape of the data right, and the rest of the application almost designs itself. Get it wrong, and you will spend weeks refactoring things that should have been straightforward.

> If you change the shape of your data, you change everything that touches it. Get the data model right early, and you save yourself from the most expensive kind of refactoring.

## Entities and Fields

An entity is a thing your application tracks. If you did the Nouns & Verbs exercise, your core nouns are your entities. A Recipe is an entity. A User is an entity. An Order is an entity.

Each entity has fields: the specific pieces of information you store about it. A Recipe entity might have: `title` (text), `description` (text), `cookTime` (number, in minutes), `servings` (number), `createdAt` (date), `authorId` (reference to a User).

Choosing the right fields is a design decision. Do you store cooking time as a single number (minutes) or as two fields (hours and minutes)? Do you store the author's name directly on the recipe, or just a reference to their user profile? Each choice has consequences.

The principle: store the minimum data needed, in the most useful format, and derive everything else. If you store a birthdate, you can always calculate the age. If you store the age, it goes stale.

```
# A simple data model for a recipe app:

User
  id          (auto-generated)
  email       (string, unique)
  name        (string)
  createdAt   (date)

Recipe
  id          (auto-generated)
  title       (string)
  description (string)
  ingredients (array of strings)
  steps       (array of strings)
  cookTime    (integer, minutes)
  servings    (integer)
  authorId    (→ User.id)
  createdAt   (date)

Collection
  id          (auto-generated)
  name        (string)
  ownerId     (→ User.id)
  recipeIds   (array of → Recipe.id)
```

## Relationships

Entities do not exist in isolation. They are connected. Understanding these connections is the core of data modeling.

One-to-many: One user can create many recipes, but each recipe has exactly one author. The recipe stores a reference to the user (`authorId`). This is the most common relationship in software.

Many-to-many: A recipe can belong to many collections, and a collection can contain many recipes. Neither side "owns" the other. This usually requires a join table, a third table that tracks which recipes are in which collections.

One-to-one: A user has exactly one profile, and a profile belongs to exactly one user. Less common, but useful when you want to separate core identity (login credentials) from extended information (bio, avatar, preferences).

When you draw your data model on paper, draw lines between entities. Write "1" or "many" on each end of the line. This diagram, called an entity-relationship diagram (ERD), is the map of your data.

## Types and Constraints

Every field has a type: text, number, date, boolean (true/false), array (list). Choosing the right type prevents entire categories of bugs.

If `cookTime` is a number, nobody can accidentally store "about thirty minutes" in it. If `email` has a uniqueness constraint, no two users can register with the same address. If `servings` has a minimum of 1, you cannot create a recipe for zero people.

Constraints are rules that your data must follow. They are enforced by the database, not by your application code. This matters because data can enter your system from many places: your UI, your API, a database migration, an import script. The database is the last line of defense.

Common constraints: required (the field cannot be empty), unique (no duplicates), minimum/maximum (number range), default (the value if none is provided), foreign key (must reference an existing record in another table).

## Thinking in Shapes

When designers think about data, the most useful instinct is thinking about shapes. What shape is this data? Is it a flat list? A tree? A table with rows and columns? A graph of connected nodes?

A to-do list is flat: one item after another, maybe with a sort order. A file system is a tree: folders containing folders. A social network is a graph: people connected to other people, with no clear hierarchy. A spreadsheet is a table: rows of records, each with the same columns.

The shape of your data determines what operations are easy and what operations are hard. In a flat list, finding an item is easy. In a tree, finding all descendants of a node is easy but finding all ancestors requires traversal. In a graph, finding connections is easy but finding the shortest path is hard.

Most web applications use tables (relational databases) because most business data is naturally tabular: users, orders, products, each with consistent fields. But knowing that other shapes exist helps you recognize when a table is the wrong choice.

## JSON: The Shape You Will See Most

In web development, data almost always travels as JSON (JavaScript Object Notation). It is the lingua franca of the internet. APIs send it. Databases store it. Frontends consume it.

JSON has two structures: objects (key-value pairs, wrapped in curly braces) and arrays (ordered lists, wrapped in square brackets). That is it. Everything from a tweet to a medical record to a satellite telemetry reading is represented with these two structures.

Understanding JSON means you can read any API response, any config file, and any data structure in your application. It is the shape of modern web data.

```
// A recipe as JSON — this is what an API sends to the frontend:
{
  "id": "rec_001",
  "title": "Pasta Aglio e Olio",
  "description": "The simplest great pasta.",
  "cookTime": 20,
  "servings": 2,
  "ingredients": [
    "200g spaghetti",
    "4 cloves garlic",
    "Red pepper flakes",
    "Extra virgin olive oil",
    "Fresh parsley"
  ],
  "steps": [
    "Boil pasta in salted water.",
    "Slice garlic thinly, cook in olive oil until golden.",
    "Add pepper flakes, then drained pasta.",
    "Toss with pasta water and parsley."
  ],
  "author": {
    "id": "usr_042",
    "name": "Marcella"
  }
}
```

## Data Modeling in Zero Vector

In Zero Vector, your data model is one of the most important things you hand to an AI agent. A clear schema with well-named tables, explicit relationships, and documented constraints lets an agent generate migrations, build endpoints, and scaffold UI forms with remarkable accuracy.

The inverse is equally true. A vague or inconsistent data model produces vague, inconsistent code. If your model has a "stuff" table with columns named "data1" through "data5," no AI agent in the world can build something coherent on top of it. The quality of your data model directly determines the quality of AI-generated code. Invest the thinking here, and the build phase gets dramatically easier.

:::exercise{title="Model Your Project"}
- Take the project you planned in the Planning lesson (or the reading tracker)
- List every entity, the things your app needs to remember
- For each entity, list its fields with types (`title: string`, `pageCount: number`, `isFinished: boolean`)
- Draw the relationships between entities: which ones reference each other?
- Mark each relationship as one-to-one, one-to-many, or many-to-many
- Write one entity as a JSON object with sample data
- You now have a data model. When you start building, this model becomes your database schema and your API contract.
:::

:::resources{title="Go Deeper"}
- [Prisma Data Modeling Guide](https://www.prisma.io/dataguide): Prisma's free guide to data modeling fundamentals. Clear explanations with diagrams.
- [JSON.org](https://www.json.org/): The specification for JSON in one page. Everything you need to know about the format.
- [Database Design for Mere Mortals](https://www.oreilly.com/library/view/database-design-for/9780136788041/): The classic beginner book on relational database design. No jargon.
- [Supabase Schema Visualizer](https://supabase.com/dashboard): If you create a free Supabase project, the schema visualizer lets you see your tables and relationships graphically.
:::
