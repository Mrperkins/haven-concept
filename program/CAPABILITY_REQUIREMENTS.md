# HAVEN Capability Program — towing, adventure, mobility and intelligence
**Working requirements v0.1 — 2026-10-11. Nothing here is physically validated or commercially sourced.**

This capability proposal expands [the product requirements](PRODUCT_REQUIREMENTS.md). All ratings are **engineering stretch targets**, not proven vehicle specifications or customer purchase promises. The powertrain remains undecided; licensed platform access, braking, powertrain cooling, structural geometry and software rights will determine achievable specs.

## Desired model separation

| Requirement | Core SUV (affordable family vehicle) | Reserve SUV (premium heavy-duty vehicle) | Maturity / hard dependency |
|---|---|---|---|
| Towing | **5,000 lb maximum targeted**, properly equipped with optional Tow package | **8,500 lb maximum targeted**, properly equipped with HD Tow package | UNVERIFIED. Require SAE J2807-type evaluation, GCWR, GAWR, GVWR, braking, hitch and driveline ratings |
| Payload carrying full family while towing | Target ≥1,600 lb useful available payload, final value TBC | Target ≥2,000–2,300 lb useful available payload depending on trim, final value TBC | CONFLICT: tongue weight, passengers, batteries and armor share payload |
| Trailer technology | Hitch alignment camera, 4/7-pin electrical support, trailer sway control, integrated brake-control provision and trailer profiles (Tow package) | All Core targets plus active trailer-trajectory visualization, trailer reverse assistance under strict safeguards, grade/thermal load monitoring | Require supplier control interfaces and safe vehicle-specific validation |
| Boat-ramp support | Traction / hill-hold and camera mode (Tow package) | Enhanced 4WD / AWD, reversible traction setting, low-speed ramp assistance | Contamination / corrosion / wet brake / slippery ramp testing |
| Still-water fording | **16–20 inches target** in controlled shallow still water only | **24–30 inches target**, only if lift/sealing architecture permits | NOT a flood-driving rating; NHTSA: never drive into flooded roads |
| Four-wheel steering | Not in base program | Optional electronic rear-steer system | Steering redundancy, packaging, supplier licensing, ISO 26262, cost and maintenance |
| Diagonal low-speed maneuver | No | Optional with validated four-wheel steering | NOT a software-only retrofit; do not market third-party "CrabWalk" naming |
| Automated parking | Supervised park assist optional, subject to validated platform | Supervised automated park assist optional / premium target | Collision avoidance, functional safety, obstacle, child and pet tests |
| Remote vehicle pickup / fetching | Future research only, **not a standard promise** | Future supervised low-speed remote Summon-like private-property mode | Separate safety case, short distance, clear line of sight, continuous human control and emergency stop |
| Gesture-operated liftgate | Power liftgate + foot/proximity gesture option | Target standard motion-gesture powered liftgate | False triggers near traffic, children, bike racks, trailers; pinch protection |
| Gesture-activated passenger doors | Manual conventional door required | Optional power doors with constrained gestures and crush sensing | Must preserve mechanical opening, curb/side clearance and child safety |
| Conversational onboard assistant | Core voice assistant goal: basic local/offline vehicle controls + navigation when feasible | Full context-aware assistant and extra family, tow and security controls | Design for on-device speech where possible and privacy-focused opt-in cloud LLM; no unsafe driving command execution |
| Navigation & theft locator | GNSS vehicle locator + consent-based app and tamper notifications target | GNSS + enhanced anti-theft location redundancy target | Subscriber connectivity terms, cellular dead zones, audit logging and lawful owner access |
| Anti-theft / recovery | Alarm, encrypted device pairing, local recording where feasible | Backup power/communication, tamper sensors, response service integration option | Never disable a moving vehicle remotely, no coercive tracking |
| Puncture resilience | Spare tire packaging or approved equivalent mobility solution; optional self-sealing tires | Prefer full-size spare with specified load/speed suitability; optional extended-mobility run-flats or self-sealing tires | No tire is "never flat"; maintain safe load/speed limits, TPMS, and an actual repair/recovery plan |

## The real boat-towing design brief

1. Define an **actual reference trailer**: e.g., 22-foot family boat + fuel + gear + trailer, loaded mass with independent scale evidence. "Can tow a boat" is insufficient.
2. Measure allowable hitch tongue loads. Ford's 2026 Expedition tow guide states typical tongue load ~10% of trailer mass for its example and warns that passengers and tongue load both count against vehicle payload. Actual trailer setups require appropriate distribution.
3. Set a **target GCWR**, axle ratings, hitch class, trailer brake interface, cooling at grade and ambient temperature, stopping distance, low-speed reversing and loss-of-traction cases.
4. Test cabin fully occupied with cargo **and** tongue weight. A vehicle cannot promise max towing at all passenger/cargo configurations.
5. Assess powertrain compromises (HEV/ICE/PHEV thermal performance vs BEV towing range, high voltage and thermal protection).
6. Validate reverse/launch behavior on wet/sloped boat ramps; never promise safe fording because a boat trailer is nearby.
7. Validate child-seat packaging and Safety Cell performance at selected tow package / suspension configuration.

### Payload feasibility example (NOT a certified rating)

- Core: 5,000 lb trailer at 10% tongue mass = **500 lb**; 5 passengers averaging 150 lb = **750 lb**; 250 lb gear = **1,500 lb payload load** before hitch/accessory weight. A 1,600-lb *rated* payload would leave little margin.
- Reserve: 8,500 lb trailer at 10–15% = **850–1,275 lb**; passengers 750 lb and gear 250 lb => **1,850–2,275 lb** payload load before hitch/accessories. **Armor steals payload.** Engineering should separate standard heavy-tow and armored variants if necessary.

Actual trailer tongue weight, ratings, passengers and load distribution must be calculated for each vehicle and tested configuration; never extrapolate from these illustrative figures to a safe load.

## Water and flooding — safety line

An optional engineered **still-water crossing** capability for known shallow, flat-bottom, low-current off-road crossings is conceptually feasible. Required work: air intake/exhaust elevations, breathers, seals, hydrostatic loads, wade speed, traction, braking after crossing, HV and low-voltage isolation, fresh/saltwater contamination, corrosion/warranty and electronic failure modes. A raised suspension alone does not provide a water rating.

**Prohibited marketing:** "flood-proof," "safe to drive through a flooded road," "survive any high water," or "waterproof batteries." NHTSA warns that rushing water can carry away cars and SUVs. Use a **turn-around flood hazard alert** in navigation, not an invitation to cross.

Sources: https://www.nhtsa.gov/road-safety/driving-in-severe-weather and https://www.nhtsa.gov/hurricane-and-flood-damaged-vehicles

## Hands-free, parking and vehicle fetching safety case

- Keep **Level 2 supervised driving** distinct from **automated parking** and **remote low-speed retrieval**. A hands-free L2 highway system does not authorize unsupervised parking-lot driving.
- Remote pickup is **roadmap / research**, not an immediate vehicle requirement; candidate product restrictions include private property only, owner near vehicle with direct sight, continuous press-to-run supervision, very low speed, validated obstacles/child detection, geofence and immediate independent stop.
- Disable with occupied child seats/unknown occupant, attached trailer, blocked sensors, steep grades or insufficient communications where required by hazard analysis.
- Do not imply deployment on public roads without a separate validated legal and operational design.
- Avoid licensed brand names from competitors in consumer-facing naming.
- Tesla's current Summon describes supervised remote parking/vehicle fetching and restricts its more capable function to private parking areas: https://www.tesla.com/ownersmanual/modely/en_pr/GUID-7D207174-88CD-4795-8265-9162A72AA578.html
- GMC shows diagonal movement requires 4-wheel steering and low-speed mode: https://www.gmc.com/support/quick-start-guides/crabwalk

## HAVEN Voice / vehicle intelligence

**Priority 1 — dependable offline-first commands (Core):** "Set rear cabin to 69 degrees," "Show rear-seat camera," "Navigate to the nearest hospital," "Open the trunk" (only when parked / in safe state), "How much fuel/charge remains?", "Find my car." Voice should supplement, not replace safety-critical physical controls.

**Priority 2 — context-sensitive family and trailer workflows (Reserve):** "Is everyone buckled?", "Start quiet mode for sleeping kids," "Show my trailer camera," "What's my tire pressure?", "How much remaining payload margin is there?" Last request depends on *accurate measured* loads or user-entered weights and must be labeled an estimate without scales. The assistant must not falsely claim actual buckle/child-seat installation validation.

**Priority 3 — optional cloud intelligence:** Natural-language trip planning, owner-manual search, maintenance explanation, repair appointments, garage/parking assistance. Cloud features require explicit opt-in, encrypted transport and minimal retention. Prompt injection, untrusted messages and authorization checks must never override motion, access or safety guardrails.

**Nonnegotiable:** no spoken prompt that bypasses gear, braking, steering, door safety, immobilizer or safety system controls; secure signed updates and access logs; offline emergency functions independent of cloud.

## HAVEN Guardian Locate / anti-theft

- Owner-controlled location sharing, compatible GNSS receiver, cellular modem with optional secondary connectivity and independent small backup supply, subject to power budget.
- Authorized guest sharing with expiration; encrypted identifiers, MFA, role and consent management, audit logs, user-visible indicator.
- Parking motion / tamper alerts, break-in evidence recording, geofence alerts, **stationary-only recovery immobilization subject to legal and safe design**.
- No invisible stalking tool: clear ownership transfer process, authorized-driver disclosures, ability to inspect and remove guest access, safety controls for domestic-abuse misuse.
- "LoJack-like" refers to function, not a partnership or licensed trademark.

## Realistic priority and cost allocation

**Day-one Core priorities:** conventional robust tow preparation if a licensable platform supports it; trailer stability/sensing; simple rear-camera hitch alignment; voice for climate/nav/occupants; GNSS security locator; practical puncture recovery. These still need BOM and vendor quotes.

**Cost-gated Core options:** 5k Tow package, supervised park assist, gesture liftgate, self-sealing tires. None priced or guaranteed.

**Reserve options:** 8.5k Tow package, adjustable ride height/adventure hardware, rear-wheel steering/diagonal mode, automated parking, additional remote pickup research, gesture power doors, redundant locator, full-size spare packaging. Armor may conflict with heavy towing, payload and diagonal mode.

**Do NOT design a single all-features platform** assuming every option can coexist. Create variant-by-variant GVWR/GCWR, wheelbase, controls, braking and price matrix first.

## Prototype validation package

- Qualified tow engineer + platform owner: SAE J2807-style tow envelope, tow brake / GCWR, temperature and crosswind stability
- Independent wading hazard and electrical ingress / corrosion lab review
- Steering / functional safety supplier: rear-wheel steering and diagonal mode
- ADAS supplier: automated parking and remote retrieval ODD / safety case
- Automotive HMI/cybersecurity: offline assistant safety boundaries, event logging, GNSS locator access control
- Accessory engineer: gesture pinch/reversing sensors, TPMS and spare-tire load packaging
- Economics: written supplier integration estimates / options margin at specified build volume

**No prototype build authorized. No supplier engaged or named for these components.**
