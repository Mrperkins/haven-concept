# HAVEN SUVs — preliminary product requirements (PRD 0.1)

**Stage:** feasibility / unvalidated. All requirements below are goals subject to OEM packaging, safety engineering, law, cost and user testing.

## Customer and product boundary

- **Core:** five-person SUV with competitive family ergonomics, practical cargo volume, manageable exterior dimensions, low lifetime cost and minimum target MSRP **$34,995** (trim-dependent; no price guaranteed).
- **Reserve:** visibly distinct and more substantial premium SUV; richer second-row experience and options for professionally engineered protective glazing and partial/full armor.
- **Baseline** on both: certified occupant restraints and child-seat accommodations, direct child-presence monitoring target, automatic emergency braking, blind-spot assistance, intelligent backup security notifications, physically accessible emergency controls, crash-conscious modular interior trim and **integrated roof-ring Safety Cell**.
- Design to fit families first, *not* marketing to those wanting maximum vehicle mass. Benchmark child injury outcomes and third-party crash metrics, pedestrian compatibility, braking, rollover, etc.

## Feature priority by evidence and complexity

| Module | Core baseline goal | Core option | Reserve | Gating work |
|---|---|---|---|---|
| Safety Cell / rollover protection | Yes | — | Yes | BIW CAD, crashworthiness, FMVSS 216a and rollover evaluation |
| LATCH / tether / seat-belt geometry | Yes | — | Yes | FMVSS 225, restraint fit study, independent child-seat installation studies |
| Child-presence detection | Yes | — | Yes | Direct sensor validation, Euro NCAP CPD, failure/false-alert analysis |
| Thermal / targeted HVAC | Sensor fallback + safe alerts | Enhanced zoned comfort | Enhanced | Sensor fusion, climate performance and power reserve |
| Parked-occupant emergency escalation | Yes, if validated | — | Yes | Driver alerts, caregiver escalations, independent emergency pathways |
| Lane keeping, ACC, AEB | Baseline target | — | Baseline | Validated ADAS supplier and FMVSS 127 applicability |
| Hands-free highway Level 2 | No | Pilot pack | Optional | Licensed system, monitored driver, mapped/supportable ODD |
| Rear camera/intercom | Target | — | Target | Privacy, child-seat blind zones, distraction HMI study |
| Rear video entertainment | No | Family Tech | Available | Crash-safe screens and mountings, child privacy, offline capability |
| Heated / ventilated front | Partial | Comfort pack | Yes | Margin, seat airbag packaging and occupant sensing |
| Rear heated / ventilated | No | Touring | Available | Cost, rear harness, seat / child restraint interference |
| Massaging seats | No | Not assumed | Upper option | Cost and occupant restraint integration |
| Rear trays / armrests | Cupholders/armrests | Trays | Trays | Stowage / impact safety; no unvalidated in-motion hard surfaces |
| Concealed cooler | Passive storage | Active cooling option | Option | Packaging, condensation, power budget, isolation |
| Integrated vacuum | No | Utility pack | Option | Removability, crash retention, cleanable hose storage |
| Smart glass | No | TBD | Option | FMVSS 205 / laws, fail-safe visibility, lifetime replacement cost |
| Exterior surveillance | Basic / optional | Guardian | Guardian | Privacy, cybersecurity, energy budget |
| Ballistic-rated glass | No | Not initial | Conditional option | Tested glazing, full-vehicle limitations, weight / egress |
| Ballistic passenger enclosure | No | No | Bespoke specialty | Vehicle-level validation, OEM/armorer approval, new safety testing |
| Heated seats, sound insulation | Cost-gated | Optional | Yes | Cost/BOM and warranty burden |

**No exterior chemical dispersal weapons**, including mirror-mounted pepper spray. Distress functionality uses recording, lighting, alerts and emergency communications with appropriate privacy and human-safety design.

### Guardian child-safety behavior (conceptual, not shipped)

1. Sensors detect potential occupant even after ignition off; use at least two independent data sources where justified by hazard analysis. Surface temp **is not core body temperature**.
2. Alert driver through immediate cabin warnings and phone; do not suppress action waiting for temperature to become dangerous.
3. Escalate to authorized caregivers and emergency assistance if required by validated decision criteria, subject to signal availability.
4. Activate climate mitigation only where powertrain, HVAC, battery protection and failure-safe controls permit; **never promise that cooling can keep a child safe indefinitely**.
5. Detect system faults and low-energy state; issue warnings; retain physical emergency egress and rescue instructions.
6. Parked pet comfort may offer displayed cabin temp and HVAC status but must not suggest it's safe to leave children alone.
7. Data retention minimized; no default cloud child video; guard against spoofing and offline failure.

### Safety Cell (rollover support on all HAVEN cars)

A roof ring, pillars, side sills and transverse load paths incorporated into original body-in-white. This is an engineering target, **not** simply welded aftermarket roll bars. Verify roof intrusion, occupant head clearance, curtain airbags, seatbelt anchors, panoramic-glass roof apertures, emergency egress, collision energy transfer and repairability with automotive engineers. Modularity never includes user-swappable crash structures.

## Preliminary trims (pricing = hypotheses)

| Line | Variant | Target MSRP | Key differentiator |
|---|---|---:|---|
| Core | S | $34,995 | Standard critical safety and practical family cabin |
| Core | SE | $37,995 | Expanded comfort and family utility |
| Core | Touring | $39,995 | Most available family tech subject to BOM |
| Reserve | Luxe | $54,995+ | Premium interior, larger vehicle concept |
| Reserve | Executive | $64,995+ | Enhanced cabin and optional Pilot |
| Reserve | Guardian | $74,995+ | Extra security electrical / chassis provision, not necessarily armor |

No higher trim may paywall basic crash protection or child-presence detection. Careful protection design may require whole-vehicle configurations instead of arbitrary plug-and-play armor.

## Utility, towing, intelligence and vehicle protection expansion (2026-10-11)

See [**Capability Program — engineering gates and variant feature matrix**](CAPABILITY_REQUIREMENTS.md). New proposed capability targets, none validated:

- **Core:** 5,000 lb maximum trailer towing with an optional tow package; hitch camera, trailer sway and brake controller provision; supervised parking assist as a cost-gated option; proximity/gesture liftgate option; offline-first natural-language vehicle controls; consent-based GNSS theft locator; practical spare or approved tire mobility solution.
- **Reserve:** 8,500 lb maximum trailer towing with heavy-duty tow package; payload target ≥2,000–2,300 lb subject to configuration and tongue load; water-fording target 24–30 inches in controlled still water only if engineered; optional rear-wheel steering and slow diagonal maneuvering; supervised automated parking and future *supervised* private-property fetching; optional gesture power doors, secure backup tracking and full-size spare.
- **Core water goal:** 16–20 inches still water only if validated. **Neither vehicle is designed or advertised to drive through flooded roads.**
- **Tire policy:** no "never-flat" claims. Self-sealing/run-flat technologies have limitations and the driver needs a usable recovery solution.
- **No autonomy overclaim:** hands-free L2 remains driver supervised; remote fetching is a different, later, geofenced and supervised operation.
- **Conflict management:** towing, armored glass, wading, wheel steering and payload must be validated as compatible vehicle-level configurations; don't assume every option can be combined.

## Configurability rules

- Cosmetic modularity: body wraps/trim/nonstructural skins, tested mounting points, electronic infotainment modules behind cybersecurity isolation.
- Safety-critical systems: locked vehicle-specific configurations, only approved service channels and new compliance evaluation after modification.
- Premium security additions: option compatibility matrix must include hinge loads, mass, center of gravity, front/side crash, emergency egress, glass integrity, sensors, power windows, payload and braking.
- Powertrains: common brand + interior targets; distinct underbodies may be needed for ICE, HEV, PHEV, BEV. Do not assert a universal platform exists.
- GVWR: may fall above 6,000 lbs on a suitable model, **not a primary engineering requirement**, never overweight a family car solely for tax marketing.

## Non-negotiable feasibility tests

1. Independent safety and regulatory review of each assembly concept.
2. At least one realistic platform licensing/access route.
3. Family packaging test (rear-facing child seat, LATCH accessibility, real load floor).
4. Automotive cybersecurity and functional safety architecture review.
5. Quote-backed supplier/BOM and warranty liability model.
6. Confirmed manufacturing/service warranty plan.
7. Independent third-party physical crash testing **before any top-safety claim**.

This PRD is intentionally demanding. If no partner can deliver it at the intended price, change the trim scope or MSRP—not the safety standard.
