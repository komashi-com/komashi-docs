---
title: Provider Rules
tags: [Provider]
question: "How can I delet a service?"
---
# Provider Rules

## Plan Management
Configure how customers can modify their subscription plans.

### Allow Plan Upgrades and Downgrades
When enabled, both customers and administrators can switch between available plans.  
This allows flexibility for scaling up or down without interrupting service.

---

## Subscription Lifecycle
Manage how subscriptions are started, canceled, and how services behave in different lifecycle states.

### Manual Start Enabled
Allows operators to manually start a subscription before the payment is fully completed.  
Useful for exception handling, migrations, or urgent activations.

### Subscription Cancellation
Define what happens when a user cancels their subscription.

**Continue Until Period End**  
Canceled subscriptions remain active until the end of the current billing period.  
No immediate service interruption occurs.

---

## Service Deletion
Control what happens to existing subscribers if a service is removed from the platform.

**Keep Subscriptions Active**  
Subscribers of the deleted service remain active until they cancel manually.  
The service is hidden from new sales but preserved for current users.

---

## Billing Profile
Control how customer billing profile changes sync with the external provider.

### Automatic Sync
When enabled, any edits customers make to their billing profile (address, tax info, etc.) are automatically synchronized with the provider system.

Customer changes sync automatically without requiring manual review or operator intervention.
