# Battle Card – Authorization Studio vs. Competitors (Confidential)

| Capability | Authorization Studio | OPA/Rego | AWS Cedar | PlainID |
|------------|---------------------|----------|-----------|---------|
| <20 ms decisions | ✔ | variable | 40–60 ms | 30–50 ms |
| Delegation graphs | ✔ | ✖ | ✖ | △ (RBAC+ABAC) |
| Explainability (Mermaid) | ✔ | ✖ | ✖ | GUI logs |
| CAEP events | ✔ | ✖ | ✖ | △ |
| Graph-based PIP | Neo4j | File/JSON | JSON | SQL |
| Deployment | SaaS + self-host | DIY | AWS only | SaaS |

**Why we win**
* Unified Identity Fabric with built-in IdP and Workflow.
* Proven latency at 500 M calls/day.
* Analyst-validated Leader (KC 2025).

**Trap-setting questions**
1. How do you model AI agent delegation without role explosion?
2. What’s your p95 latency with 1,000 concurrent requests?
3. Which standard do you use for CAEP security events?

**Land & expand play**
Start with PDP for micro-services, expand to IdP replacement and Workflow automation. 