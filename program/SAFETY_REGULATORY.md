# HAVEN safety and regulatory workstream — initial risk register

**All items are UNVERIFIED; no compliance claim is made.** Professional automotive regulatory, crash, product-liability and privacy counsel must establish the complete set of requirements for each actual powertrain and market.

## US market entry is not a registration shortcut

For production road vehicles, seek counsel on manufacturer vs alterer vs final-stage status; VIN/WMI; 49 CFR Parts 565/566/567; FMVSS self-certification; recall reporting; emissions/CAFE and EPA certification; OBD; cybersecurity; product liability insurance; applicable state consumer warranty and dealer laws. Licensing a chassis does **not** transfer an OEM's complete vehicle certification if HAVEN modifies safety-relevant systems.

Source: https://www.nhtsa.gov/importing-vehicle/importation-and-certification-faqs-8
Source: https://www.epa.gov/ve-certification/overview-certification-and-compliance-vehicles-and-engines

## Functional safety work items

| Subject | Risks to control | Proof required | Status |
|---|---|---|---|
| Safety Cell & rollovers | Roof crush, side pole intrusion, glass roof packaging, curtain airbags | CAE, BIW testing, FMVSS 216a and full vehicle crash | Open |
| Restraints & car seats | LATCH/tether anchors, belt buckles, ISOFIX geometry, seating postures | FMVSS 208, 210, 213/225 applicability; real CRS fit-testing | Open |
| AEB and ADAS | False braking, missed VRUs, lane centering faults | Supplier safety case, field ODD and FMVSS 127 performance | Open |
| Direct child presence | Missed infant hidden by seat/blanket, sensor failure | Hazard analysis and Euro NCAP CPD test protocol | Open |
| Heat rescue | Battery depletion, HVAC failure, inability to call help | Sensor/power redundancy, degraded-mode HMI, real chamber tests | Open |
| Camera privacy | Rear child video leak, unauthorized access | Threat model, retention policy, encryption and user controls | Open |
| Level 2 hands-free | Driver complacency, inability to take over, map restrictions | DMS testing, ODD restrictions, HMI, documented validation | Open |
| Smart glass | Unduly dark/opaque glass, impact breakage | FMVSS 205 assessment, glass and visibility tests | Open |
| Rear activity trays | Hard objects in a crash, belt routing blockage | Occupant injury and CRS interference testing | Open |
| Guardian security | Trapped occupants, emergency exit failures | Mechanical release, post-crash unlocking strategy, fault testing | Open |
| Ballistic upgrades | Overweight doors, reduced braking/rollover margins, egress impacts | Component ratings plus *vehicle-level* crash/handling proof | Open |
| EV and hybrid HV | HV isolation in crash, thermal incidents | FMVSS electrical safety, battery/thermal tests | Open |

A 2026 U.S. regulatory review must verify exact effective dates. The original FMVSS 127 rule named September 2029 for most new light vehicles, but changes were under consideration; do not build the project calendar on a stale deadline.

### GVWR and mass

- **GVWR** is the *rated loaded weight*, not empty curb mass. 6,000 lbs appears in certain federal business tax rules, but tax eligibility depends on qualified business use, taxpayer facts, and current law; do not promise a deduction.
- Roof crush standard 216a uses vehicle-weight-related loads; greater weight can demand additional structure. Do not deliberately raise curb mass simply to qualify for a business deduction.
- IIHS has documented diminishing occupant safety returns and higher harms to people in other vehicles as SUVs get heavier.
- Target superior injury outcomes rather than "tank" marketing alone.

Sources: https://www.nhtsa.gov/sites/nhtsa.gov/files/2023-06/TP-216a-01.pdf ; https://www.iihs.org/news/detail/supersizing-vehicles-offers-minimal-safety-benefits--but-substantial-dangers ; https://www.irs.gov/publications/p946

### Safety Cell naming/claims

"Integrated rollover structure" and "Safety Cell" may describe a **proposed architecture**. Do not assert that a specific crash survival or roof crush ratio is achieved before actual validation; trademark clearance may also be required for branded names.

### Ballistic/security nomenclature

- Never market glazing alone as a bulletproof vehicle. Select an accepted ballistic-resistant glazing test standard and exact threat condition with a specialist.
- Optional glass requires engineering compatibility; exterior mirrors and vents cannot host chemical weapon systems.
- Full-body armoring involves more than windows: door/roof/firewall overlaps, transparency, emergency egress, sensor visibility, GVWR/payload, brake/suspension and post-impact function all interact.
- Use an independent armoring partner; do not create home retrofit steps for safety-critical security systems.

## Next 30 days

- Paid 2–4h review by automotive vehicle certification specialist: list required rule families and estimated cost for US market.
- Paid 2–4h vehicle integration expert review: Safety Cell and electronic occupant surveillance/ADAS architecture.
- Resolve legal ownership of a production platform or terminate licensed-platform assumption.
- Identify child-seat compatibility design/test partner and minimum rear-facing seat geometry.
- Build hazard log from at least 20 failure cases for child presence/heat mitigation.
- Record accountable owners and dated documents for each verification step.

Sources: https://www.nhtsa.gov/vehicle-manufacturers/test-procedures ; https://www.euroncap.com/child-occupant-protection/ ; https://saemobilus.sae.org/topics/electrical-electronics-and-avionics/automation/driving-automation .
