---
sidebar_position: 2
title: API Integration
tags: []
question: "How do I integrate the Komashi API?"
---

## API Integration

The Komashi API lets you query and manage platform data programmatically. Use it to connect Komashi to your own systems, dashboards, or workflows.

---

## Authentication

All API requests require a Bearer token in the `Authorization` header:

```
Authorization: Bearer YOUR_API_KEY
```

You can generate and manage API keys in your developer dashboard.

---

## Base URL

```
https://api.komashi.com/v1
```

---

## Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/providers` | List all providers visible to your account |
| `GET` | `/providers/{id}/services` | Fetch services offered by a specific provider |
| `GET` | `/customers` | Retrieve customer records |
| `POST` | `/customers` | Create a new customer |
| `GET` | `/subscriptions` | List active subscriptions |
| `GET` | `/invoices` | Retrieve invoice history |

---

## Response Format

All responses are returned as JSON.

- **Successful responses** include a `data` field
- **Error responses** include an `error` field with a message and status code

---

## Rate Limits

The API is rate-limited per API key. If you exceed the limit, you will receive a `429` response — implement exponential backoff in your client.

---

## What You Do NOT Need to Handle

- **Payment processing** — managed by Komashi
- **Subscription lifecycle** — handled server-side
- **Pricing logic** — configured by providers, readable via API

For full endpoint documentation, request/response schemas, and code examples, see the Komashi developer portal.