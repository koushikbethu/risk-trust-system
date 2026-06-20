# Risk-Based Identity Trust System

A frontend-only web application demonstrating intelligent risk-based access control with real-time risk scoring and behavioral analysis.

## 🚀 Live Demo

Visit: **https://koushikbethu.github.io/risk-trust-system/**

## Features

- ✅ Login with any username
- ✅ Real-time risk score (0-100)
- ✅ Color-coded risk levels (Low/Medium/High/Critical)
- ✅ Simulate New Device (+30 risk)
- ✅ Simulate Abnormal Behavior (+45 risk)
- ✅ Simulate Safe Behavior (reset to low)
- ✅ Activity logs with timestamps
- ✅ Client-side only (no backend needed)

## Risk Scoring

| Factor | Impact |
|--------|--------|
| Base Score | +10 |
| New Device | +30 |
| Unusual Time | +20 |
| Behavioral Anomaly | +25 |
| Trusted User | -20 |

## Risk Levels

| Score | Level | Action | Color |
|-------|-------|--------|-------|
| 0-29 | Low | Allow | Green |
| 30-59 | Medium | OTP | Yellow |
| 60-79 | High | MFA | Orange |
| 80-100 | Critical | Block | Red |

## Local Development

```bash
npm install
npm run dev
```

## Technologies

- React 18
- Vite
- React Router DOM
- Pure CSS

## License

MIT
