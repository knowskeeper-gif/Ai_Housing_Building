/**
 * AI-Powered Residential Housing Planning and Estimation System - Capstone Wizard Script
 * driving location hazard auditing (Phase 1), house recommendation cards (Phase 2),
 * blueprint specs (Phase 3), cost computation with 2-worker default scheduler (Phase 4),
 * price forecasting (Phase 5), GIS risk details (Phase 6), and printable reports (Phase 7).
 */

document.addEventListener('DOMContentLoaded', () => {
    // HIERARCHICAL LOCATION LOOKUP DATA
    const LOCATIONS = {
        davao_norte: {
            name: 'Davao del Norte',
            cities: {
                panabo: {
                    name: 'Panabo City',
                    barangays: {
                        san_vicente: { name: 'San Vicente', risk: 'Moderate Risk', score: '72/100 (MODERATE)', flood: 'Low', seismic: 'Moderate', soil: 'Good', advisories: ['✓ Use reinforced concrete foundation', '✓ Apply seismic reinforcement', '✓ Use elevated floor level'] },
                        gredu: { name: 'Gredu', risk: 'Stable Low Risk', score: '38/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Good', advisories: ['✓ Standard concrete pad foundations approved', '✓ Standard wood or steel framing allowed', '✓ Regular concrete hollow block walls compliant'] },
                        new_pandan: { name: 'New Pandan', risk: 'Stable Low Risk', score: '42/100 (LOW)', flood: 'Moderate', seismic: 'Low', soil: 'Fair', advisories: ['✓ Standard concrete pad foundations approved', '✓ Elevated floor levels recommended', '✓ Standard masonry construction approved'] },
                        quezon: { name: 'Quezon', risk: 'Moderate Risk', score: '65/100 (MODERATE)', flood: 'High', seismic: 'Low', soil: 'Good', advisories: ['✓ Use elevated floor level', '✓ Reinforced concrete slab construction', '✓ Improved storm drainage access'] }
                    }
                },
                tagum: {
                    name: 'Tagum City',
                    barangays: {
                        apokon: { name: 'Apokon', risk: 'Stable Low Risk', score: '30/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Excellent', advisories: ['✓ Standard concrete pad foundations approved', '✓ Standard wood or steel framing allowed', '✓ Regular concrete hollow block walls compliant'] },
                        mankilam: { name: 'Mankilam', risk: 'Moderate Risk', score: '55/100 (MODERATE)', flood: 'Moderate', seismic: 'Low', soil: 'Good', advisories: ['✓ Reinforced slab-on-grade recommended', '✓ Adequate footing depths required', '✓ Dual concrete partition headers'] },
                        visayan_village: { name: 'Visayan Village', risk: 'Stable Low Risk', score: '35/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Good', advisories: ['✓ Standard foundations approved', '✓ Multi-truss roof bracing recommended', '✓ Regular masonry walls allowed'] },
                        magugpo_west: { name: 'Magugpo West', risk: 'Stable Low Risk', score: '28/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Excellent', advisories: ['✓ Standard structural layouts approved', '✓ Standard materials allowed', '✓ Regular concrete foundations'] }
                    }
                },
                samal: {
                    name: 'Samal City (IGACOS)',
                    barangays: {
                        babak: { name: 'Babak', risk: 'Moderate Risk', score: '50/100 (MODERATE)', flood: 'Low', seismic: 'Moderate', soil: 'Good', advisories: ['✓ Tie-wire rebar columns recommended', '✓ Elevated concrete ground piers', '✓ Coastal high-wind roof clips'] },
                        penaplata: { name: 'Peñaplata', risk: 'Stable Low Risk', score: '32/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Good', advisories: ['✓ Standard foundations approved', '✓ Conventional timber or concrete design', '✓ Regular safety margins apply'] },
                        kaputian: { name: 'Kaputian', risk: 'Moderate Risk', score: '48/100 (MODERATE)', flood: 'Low', seismic: 'Moderate', soil: 'Fair', advisories: ['✓ Anti-scour footing reinforcement', '✓ Seismic column tie-wire bracing', '✓ Multi-pitch roof trusses'] },
                        villarica: { name: 'Villarica', risk: 'Stable Low Risk', score: '35/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Good', advisories: ['✓ Standard concrete framing approved', '✓ Standard wooden trusses permitted', '✓ Ground slab structure approved'] }
                    }
                },
                carmen: {
                    name: 'Carmen',
                    barangays: {
                        ising: { name: 'Ising (Poblacion)', risk: 'Moderate Risk', score: '68/100 (MODERATE)', flood: 'Moderate', seismic: 'Low', soil: 'Good', advisories: ['✓ Elevated foundation floor levels', '✓ Solid concrete strip footing', '✓ Hurricane-resistant roofing'] },
                        alejal: { name: 'Alejal', risk: 'Stable Low Risk', score: '39/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Good', advisories: ['✓ Standard ground pads approved', '✓ Standard framing layouts compliant', '✓ Conventional masonry allowed'] },
                        magsaysay: { name: 'Magsaysay', risk: 'High Danger Zone', score: '82/100 (HIGH RISK)', flood: 'High', seismic: 'Low', soil: 'Fair', advisories: ['✓ Raised concrete stilt structure required', '✓ Strong concrete tie-beams required', '✓ Heavy storm-rated roof clips'] },
                        tuganay: { name: 'Tuganay', risk: 'High Danger Zone', score: '85/100 (HIGH RISK)', flood: 'High', seismic: 'Low', soil: 'Poor', advisories: ['✓ Deep pile or stilt foundation mandatory', '✓ Soil stabilization treatment advised', '✓ Reinforced concrete wall frames'] }
                    }
                },
                sto_tomas: {
                    name: 'Sto. Tomas',
                    barangays: {
                        tibal_on: { name: 'Tibal-on', risk: 'Stable Low Risk', score: '34/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Good', advisories: ['✓ Standard building specifications approved', '✓ Regular masonry walls allowed', '✓ Conventional slab base'] },
                        kimamon: { name: 'Kimamon', risk: 'Moderate Risk', score: '58/100 (MODERATE)', flood: 'Moderate', seismic: 'Low', soil: 'Good', advisories: ['✓ Elevated floor pads recommended', '✓ Increased footing thickness', '✓ Double-truss roof anchors'] },
                        san_miguel: { name: 'San Miguel', risk: 'Stable Low Risk', score: '40/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Good', advisories: ['✓ Standard pad foundations approved', '✓ Standard timber or metal framing', '✓ Normal concrete blocks permitted'] },
                        new_visayas: { name: 'New Visayas', risk: 'Stable Low Risk', score: '36/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Good', advisories: ['✓ Standard layouts compliant', '✓ Standard building materials approved', '✓ Conventional concrete foundation'] }
                    }
                }
            }
        },
        davao_sur: {
            name: 'Davao del Sur',
            cities: {
                davao_city: {
                    name: 'Davao City',
                    barangays: {
                        buhangin: { name: 'Buhangin', risk: 'Stable Low Risk', score: '35/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Good', advisories: ['✓ Standard concrete pad foundations approved', '✓ Standard wood or steel framing allowed', '✓ Regular concrete hollow block walls compliant'] },
                        talomo: { name: 'Talomo', risk: 'Moderate Risk', score: '62/100 (MODERATE)', flood: 'High', seismic: 'Low', soil: 'Good', advisories: ['✓ Use elevated floor levels', '✓ Reinforced concrete structural slabs', '✓ Advanced foundation water sealants'] },
                        agdao: { name: 'Agdao', risk: 'Moderate Risk', score: '58/100 (MODERATE)', flood: 'Moderate', seismic: 'Low', soil: 'Fair', advisories: ['✓ Elevated foundation floor levels', '✓ Enhanced wall reinforcement bars', '✓ Solid base concrete strip footing'] },
                        toril: { name: 'Toril', risk: 'Stable Low Risk', score: '25/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Excellent', advisories: ['✓ Standard foundations approved', '✓ Standard timber or metal framing', '✓ Normal concrete blocks permitted'] },
                        bajada: { name: 'Bajada', risk: 'Stable Low Risk', score: '30/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Good', advisories: ['✓ Standard concrete ground base pads', '✓ Standard wood or steel framing', '✓ Regular masonry structure'] }
                    }
                },
                digos: {
                    name: 'Digos City',
                    barangays: {
                        tres_de_mayo: { name: 'Tres de Mayo', risk: 'Stable Low Risk', score: '28/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Good', advisories: ['✓ Standard structural layouts approved', '✓ Standard materials approved', '✓ Regular concrete foundations'] },
                        zone_1: { name: 'Zone 1 (Poblacion)', risk: 'Stable Low Risk', score: '33/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Good', advisories: ['✓ Standard building specifications approved', '✓ Regular masonry walls allowed', '✓ Conventional slab base'] },
                        matti: { name: 'Matti', risk: 'Moderate Risk', score: '45/100 (MODERATE)', flood: 'Low', seismic: 'Moderate', soil: 'Good', advisories: ['✓ Tie-wire rebar column mesh', '✓ Foundation seismic reinforcement', '✓ Elevated floor levels recommended'] },
                        colorado: { name: 'Colorado', risk: 'Moderate Risk', score: '52/100 (MODERATE)', flood: 'Low', seismic: 'Moderate', soil: 'Fair', advisories: ['✓ Solid strip concrete footing', '✓ Seismic column reinforcements', '✓ Dual concrete partition headers'] }
                    }
                }
            }
        },
        leyte: {
            name: 'Leyte',
            cities: {
                tacloban: {
                    name: 'Tacloban City',
                    barangays: {
                        anibong: { name: 'Anibong', risk: 'High Danger Zone', score: '88/100 (HIGH RISK)', flood: 'High (Storm Surge Basin)', seismic: 'Moderate', soil: 'Fair', advisories: ['✓ Elevated pillar concrete foundation strictly required', '✓ Heavy concrete structural wall reinforcements', '✓ Hurricane-resistant roof frame clips'] },
                        diit: { name: 'Diit', risk: 'Moderate Risk', score: '60/100 (MODERATE)', flood: 'Moderate', seismic: 'Low', soil: 'Good', advisories: ['✓ Elevated foundation floor level', '✓ Reinforced concrete wall frames', '✓ Solid base concrete strip footing'] },
                        san_jose: { name: 'San Jose', risk: 'High Danger Zone', score: '84/100 (HIGH RISK)', flood: 'High', seismic: 'Low', soil: 'Fair', advisories: ['✓ Elevated concrete stilt structures required', '✓ Heavy-duty rebar foundation grid', '✓ Hurricane strap locks on trusses'] },
                        marasbaras: { name: 'Marasbaras', risk: 'Moderate Risk', score: '55/100 (MODERATE)', flood: 'Moderate', seismic: 'Low', soil: 'Good', advisories: ['✓ Ground level elevation recommended', '✓ Increased concrete block structural steel', '✓ Standard storm-grade roofing'] }
                    }
                },
                ormoc: {
                    name: 'Ormoc City',
                    barangays: {
                        valencia: { name: 'Valencia', risk: 'Stable Low Risk', score: '30/100 (LOW)', flood: 'Low', seismic: 'Low', soil: 'Good', advisories: ['✓ Standard concrete pad foundations approved', '✓ Standard wood or steel framing allowed', '✓ Regular concrete hollow block walls compliant'] },
                        cogon: { name: 'Cogon', risk: 'Moderate Risk', score: '48/100 (MODERATE)', flood: 'Moderate', seismic: 'Low', soil: 'Good', advisories: ['✓ Elevated floor pads recommended', '✓ Solid concrete strip footing', '✓ Standard storm-grade roofing'] },
                        can_adieng: { name: 'Can-adieng', risk: 'Moderate Risk', score: '52/100 (MODERATE)', flood: 'High', seismic: 'Low', soil: 'Fair', advisories: ['✓ Elevated concrete stilt foundations', '✓ Reinforced slab-on-grade framing', '✓ Anti-scour footing reinforcement'] },
                        linao: { name: 'Linao', risk: 'Moderate Risk', score: '56/100 (MODERATE)', flood: 'High', seismic: 'Low', soil: 'Good', advisories: ['✓ Ground level elevation required', '✓ Standard masonry construction approved', '✓ Elevated floor levels recommended'] }
                    }
                }
            }
        }
    };

    // SYSTEM GLOBAL STATE
    const state = {
        province: 'davao_norte',
        city: 'panabo',
        barangay: 'san_vicente',
        lot: 'Zone 3, Lot 14-B',

        activeHouse: 'elevated', // Selected recommended house design
        crewSize: 2,             // Initialized strictly to 2 Workers as per capstone guidelines

        // Dynamic location hazard indexes (Phase 1 & Phase 6)
        locationAnalysis: {
            title: 'Location Status: Moderate Risk',
            gisScore: '72/100 (MODERATE)',
            flood: 'Low',
            seismic: 'Moderate',
            soil: 'Good',
            advisories: [
                '✓ Use reinforced concrete foundation',
                '✓ Apply seismic reinforcement',
                '✓ Use elevated floor level'
            ]
        },

        // Material current price indicators (Phase 5)
        rates: {
            cement: 280,      // per bag
            steel: 75,       // per kg (current)
            bricks: 15,       // per pc (CHB)
            sand: 1500,       // per m3
            wood: 80,         // per bd ft (coco lumber)
            roof: 450,        // per m2
            paint: 250,       // per liter
            fixtures: 4500,   // per utilities set
            labor: 650        // daily wage PHP
        },

        // Detailed House Models (Phase 2 & Phase 3)
        houses: {
            bungalow: {
                id: 'bungalow',
                name: 'Small Bungalow Concrete',
                price: 361000,
                area: 45,
                beds: 2,
                baths: 1,
                areaTier: 'standard',
                img: 'Img/Small_House.png',
                blueprint: 'Img/Small_House_BluePrint.png',
                safetyScore: '94%',
                foundation: 'Reinforced Strip Footing',
                walls: 'Reinforced CHB Masonry',
                roof: 'Gable Steel Trusses',
                adaptations: ['✓ Solid strip concrete footing', '✓ Seismic columns tie-wire bracing', '✓ Hurricane strap locks'],
                baseDays: 60,
                multipliers: { cement: 120, steel: 800, bricks: 1800, sand: 15, lumber: 600, roof: 55, paint: 60, fixtures: 3 }
            },
            family: {
                id: 'family',
                name: 'Family House Modern Concrete',
                price: 647000,
                area: 70,
                beds: 3,
                baths: 2,
                areaTier: 'premium',
                img: 'Img/house_standard.png',
                blueprint: 'Img/house_standard_blueprint.png',
                safetyScore: '96%',
                foundation: 'Reinforced Concrete Slab-on-Grade',
                walls: 'Load-Bearing CHB Columns',
                roof: 'Hip Profile GI Steel Sheets',
                adaptations: ['✓ Heavy rebar base grid', '✓ Dual concrete partition headers', '✓ Double-truss roof anchors'],
                baseDays: 90,
                multipliers: { cement: 250, steel: 1800, bricks: 3000, sand: 30, lumber: 1000, roof: 85, paint: 100, fixtures: 5 }
            },
            elevated: {
                id: 'elevated',
                name: 'Elevated Flood-Resistant House',
                price: 603000,
                area: 60,
                beds: 2,
                baths: 1,
                areaTier: 'premium',
                img: 'Img/house_elevated.png',
                blueprint: 'Img/house_elevated_Blueprint.png',
                safetyScore: '98%',
                foundation: 'Concrete Stilt Columns (Elevated)',
                walls: 'Lightweight Concrete Masonry',
                roof: 'Storm-Grade Gable Steel Framing',
                adaptations: ['✓ Elevated foundation floor stilt pillars', '✓ Anti-scour footing reinforcement', '✓ Aerodynamic roof profiling'],
                baseDays: 80,
                multipliers: { cement: 200, steel: 1500, bricks: 2200, sand: 25, lumber: 800, roof: 75, paint: 80, fixtures: 4, specialty: 60000 }
            },
            flood_protector: {
                id: 'flood_protector',
                name: 'Flood Protector Concrete House',
                price: 638000,
                area: 65,
                beds: 3,
                baths: 2,
                areaTier: 'premium',
                img: 'Img/house_flood_protector.jpg',
                blueprint: 'Img/house_flood_protector_blueprint.jpg',
                safetyScore: '99%',
                foundation: 'High-Elevated Stilt Concrete Columns',
                walls: 'Monolithic Anti-Scour Concrete CHB',
                roof: 'Storm-Shield Hip Profile Steel Trusses',
                adaptations: [
                    '✓ High-water surge elevated stilt foundation',
                    '✓ Anti-scour deep ground pier anchoring',
                    '✓ Category 4 typhoon aerodynamic roof bracing'
                ],
                baseDays: 85,
                multipliers: { cement: 230, steel: 1650, bricks: 2600, sand: 28, lumber: 850, roof: 80, paint: 90, fixtures: 5, specialty: 65000 }
            },
            wood_cabin: {
                id: 'wood_cabin',
                name: 'Native Eco-Wood Cabin',
                price: 301000,
                area: 50,
                beds: 2,
                baths: 1,
                areaTier: 'standard',
                img: 'Img/house_wood_cabin.png',
                blueprint: 'Img/House_wood_cabin_blueprint.png',
                safetyScore: '92%',
                foundation: 'Raised Timber Pier Footings',
                walls: 'Treated Hardwood / Coco Lumber framing',
                roof: 'Light-gauge ribbed GI steel sheets',
                adaptations: ['✓ Flexible pier timber framing', '✓ High wind-load wooden trusses', '✓ Natural cross-ventilation styling'],
                baseDays: 50,
                multipliers: { cement: 40, steel: 300, bricks: 600, sand: 8, lumber: 1200, roof: 60, paint: 50, fixtures: 3 }
            },
            wood_villa: {
                id: 'wood_villa',
                name: 'Premium Timber Frame Villa',
                price: 571000,
                area: 85,
                beds: 4,
                baths: 3,
                areaTier: 'luxury',
                img: 'Img/Simi_Wood_Houses.png',
                blueprint: 'Img/Simi_Wood_Houses_Blueprint.png',
                safetyScore: '95%',
                foundation: 'Reinforced Concrete Ground Piers',
                walls: 'Solid Timber Panel Prefab framing',
                roof: 'High-pitch heavy wood structural trusses',
                adaptations: ['✓ Seismic solid-wood joint locks', '✓ Dual foundation anchor points', '✓ High-tensile steel truss brackets'],
                baseDays: 75,
                multipliers: { cement: 80, steel: 600, bricks: 1000, sand: 12, lumber: 2000, roof: 100, paint: 120, fixtures: 6, specialty: 50000 }
            }
        }
    };

    // DOM ELEMENTS - Step 1 Location
    const provinceSelect = document.getElementById('provinceSelect');
    const citySelect = document.getElementById('citySelect');
    const barangaySelect = document.getElementById('barangaySelect');
    const lotDetails = document.getElementById('lotDetails');
    const btnAuditLocation = document.getElementById('btnAuditLocation');

    // DOM ELEMENTS - Location Assessment Reports
    const gisSafetyOutput = document.getElementById('gisSafetyOutput');
    const recommendationTitle = document.getElementById('recommendationTitle');
    const recommendationDesc = document.getElementById('recommendationDesc');
    const lblFloodRisk = document.getElementById('lblFloodRisk');
    const lblSeismicRisk = document.getElementById('lblSeismicRisk');
    const lblSoilRisk = document.getElementById('lblSoilRisk');
    const lblRiskAdvice = document.getElementById('lblRiskAdvice');
    const lblGisScore = document.getElementById('lblGisScore');
    const houseSelectionGrid = document.getElementById('houseSelectionGrid');
    const gisMapSvg = document.getElementById('gisMapSvg');
    const gisMapCoords = document.getElementById('gisMapCoords');

    // DOM ELEMENTS - Wizard Layout screens
    const step1Container = document.getElementById('step1Container');
    const step2Container = document.getElementById('step2Container');
    const stepIndicator1 = document.getElementById('stepIndicator1');
    const stepIndicator2 = document.getElementById('stepIndicator2');
    const stepBadge2 = document.getElementById('stepBadge2');
    const wizardProgressBar = document.getElementById('wizardProgressBar');
    const btnBackToStep1 = document.getElementById('btnBackToStep1');

    // DOM ELEMENTS - Step 2 Targets
    const step2Location = document.getElementById('step2Location');
    const step2HousePrice = document.getElementById('step2HousePrice');
    const step2HouseImg = document.getElementById('step2HouseImg');
    const step2BlueprintImg = document.getElementById('step2BlueprintImg');
    const step2MaterialsBody = document.getElementById('step2MaterialsBody');
    const laborCrewSlider = document.getElementById('laborCrewSlider');
    const laborCrewLabel = document.getElementById('laborCrewLabel');
    const sysCrewBadge = document.getElementById('sysCrewBadge');
    const laborTimeDuration = document.getElementById('laborTimeDuration');

    const printFoundationType = document.getElementById('printFoundationType');
    const printWallMaterial = document.getElementById('printWallMaterial');
    const printRoofMaterial = document.getElementById('printRoofMaterial');
    const printRiskAdapt1 = document.getElementById('printRiskAdapt1');
    const printRiskAdapt2 = document.getElementById('printRiskAdapt2');
    const printRiskAdapt3 = document.getElementById('printRiskAdapt3');

    // DOM ELEMENTS - Printable reports (Phase 7)
    const sysExportBtn = document.getElementById('sysExportBtn');
    const sysExportModal = document.getElementById('sysExportModal');
    const btnCloseSysModal = document.getElementById('btnCloseSysModal');
    const btnPrintSysActual = document.getElementById('btnPrintSysActual');
    const printSysDateString = document.getElementById('printSysDateString');

    const printProvince = document.getElementById('printProvince');
    const printCity = document.getElementById('printCity');
    const printBarangay = document.getElementById('printBarangay');
    const printRiskRating = document.getElementById('printRiskRating');
    const printArea = document.getElementById('printArea');
    const printBedBaths = document.getElementById('printBedBaths');
    const printWalls = document.getElementById('printWalls');
    const printRoof = document.getElementById('printRoof');
    const printGisScore = document.getElementById('printGisScore');
    const printGisDesc = document.getElementById('printGisDesc');
    const printCrew = document.getElementById('printCrew');
    const printDuration = document.getElementById('printDuration');
    const printTotalPrice = document.getElementById('printTotalPrice');
    const printMaterialsTableBody = document.getElementById('printMaterialsTableBody');

    // -------------------------------------------------------------
    // INITIALIZATION
    // -------------------------------------------------------------
    function init() {
        // Dropdown dynamic changes
        if (provinceSelect) {
            provinceSelect.addEventListener('change', () => {
                reloadCities();
                auditGeospatialRisks();
            });
        }
        if (citySelect) {
            citySelect.addEventListener('change', () => {
                reloadBarangays();
                auditGeospatialRisks();
            });
        }
        if (barangaySelect) {
            barangaySelect.addEventListener('change', () => {
                auditGeospatialRisks();
            });
        }

        // Location Risk Audit trigger
        if (btnAuditLocation) {
            btnAuditLocation.addEventListener('click', auditGeospatialRisks);
        }

        // Back to Step 1 triggers
        if (btnBackToStep1) {
            btnBackToStep1.addEventListener('click', () => {
                transitionWizard(1);
            });
        }

        // Stepper pills click triggers (works on both phone and computer)
        if (stepIndicator1) {
            stepIndicator1.addEventListener('click', () => transitionWizard(1));
        }
        if (stepIndicator2) {
            stepIndicator2.addEventListener('click', () => transitionWizard(2));
        }

        // Labor crew workforce slider triggers
        if (laborCrewSlider) {
            laborCrewSlider.addEventListener('input', (e) => {
                state.crewSize = parseInt(e.target.value);
                if (laborCrewLabel) laborCrewLabel.innerText = `${state.crewSize} Workers`;
                if (sysCrewBadge) sysCrewBadge.innerText = `${state.crewSize} Workers`;

                // Recalculate bill of materials and timeline duration
                calculateHouseProposal();
                updateWorkforcePlanText(state.crewSize);
            });
        }

        // Phase 7: Export modal actions
        if (sysExportBtn) {
            sysExportBtn.addEventListener('click', openFinalReportModal);
        }
        if (btnCloseSysModal) {
            btnCloseSysModal.addEventListener('click', () => sysExportModal.style.display = 'none');
        }
        if (btnPrintSysActual) {
            btnPrintSysActual.addEventListener('click', () => window.print());
        }

        // Populate initial dropdowns dynamically
        reloadCities();

        // Load initial selection grid
        auditGeospatialRisks();
    }

    // -------------------------------------------------------------
    // DYNAMIC DROPDOWN LOADS
    // -------------------------------------------------------------
    // -------------------------------------------------------------
    // DYNAMIC DROPDOWN LOADS (Province -> City -> Barangay)
    // -------------------------------------------------------------
    function reloadCities() {
        const provKey = provinceSelect.value;
        const provData = LOCATIONS[provKey];
        citySelect.innerHTML = '';
        if (provData && provData.cities) {
            Object.keys(provData.cities).forEach(cityKey => {
                const option = document.createElement('option');
                option.value = cityKey;
                option.innerText = provData.cities[cityKey].name;
                citySelect.appendChild(option);
            });
        }
        reloadBarangays();
    }

    function reloadBarangays() {
        const provKey = provinceSelect.value;
        const cityKey = citySelect.value;
        const provData = LOCATIONS[provKey];
        barangaySelect.innerHTML = '';
        if (provData && provData.cities && provData.cities[cityKey]) {
            const barangays = provData.cities[cityKey].barangays;
            Object.keys(barangays).forEach(bKey => {
                const option = document.createElement('option');
                option.value = bKey;
                option.innerText = barangays[bKey].name;
                barangaySelect.appendChild(option);
            });
        }
    }

    // -------------------------------------------------------------
    // PHASE 1: GEOSPATIAL AUDIT
    // -------------------------------------------------------------
    function auditGeospatialRisks() {
        const provKey = provinceSelect.value;
        const cityKey = citySelect.value;
        const bKey = barangaySelect.value;

        const provData = LOCATIONS[provKey];
        if (!provData) return;
        const cityData = provData.cities[cityKey];
        if (!cityData) return;
        const bData = cityData.barangays[bKey];
        if (!bData) return;

        state.province = provData.name;
        state.city = cityData.name;
        state.barangay = bData.name;
        state.lot = lotDetails.value.trim() || 'Zone 3, Lot 14-B';

        state.locationAnalysis = {
            title: `Location Status: ${bData.risk}`,
            gisScore: bData.score,
            flood: bData.flood,
            seismic: bData.seismic,
            soil: bData.soil,
            advisories: bData.advisories
        };

        // Render audited location info in Phase 1 panel
        if (recommendationTitle) recommendationTitle.innerText = state.locationAnalysis.title;
        if (lblFloodRisk) {
            lblFloodRisk.innerText = state.locationAnalysis.flood;
            lblFloodRisk.style.color = state.locationAnalysis.flood.includes('High') ? '#ef4444' : 'var(--green-600)';
        }
        if (lblSeismicRisk) {
            lblSeismicRisk.innerText = state.locationAnalysis.seismic;
            lblSeismicRisk.style.color = state.locationAnalysis.seismic.includes('High') ? '#ef4444' : (state.locationAnalysis.seismic.includes('Moderate') ? 'var(--orange-500)' : 'var(--green-600)');
        }
        if (lblSoilRisk) {
            lblSoilRisk.innerText = state.locationAnalysis.soil;
            lblSoilRisk.style.color = state.locationAnalysis.soil.includes('Poor') ? '#ef4444' : (state.locationAnalysis.soil.includes('Fair') ? 'var(--orange-500)' : 'var(--green-600)');
        }
        if (lblGisScore) {
            lblGisScore.innerText = state.locationAnalysis.gisScore;
            lblGisScore.style.color = state.locationAnalysis.gisScore.includes('HIGH') ? '#ef4444' : (state.locationAnalysis.gisScore.includes('MODERATE') ? 'var(--orange-500)' : 'var(--green-600)');
        }

        // Parse numerical hazard score from "72/100 (MODERATE)" to update threat meter
        const numericScore = parseInt(bData.score.split('/')[0]) || 50;
        const hazardMeterFill = document.getElementById('hazardMeterFill');
        if (hazardMeterFill) {
            hazardMeterFill.style.width = `${numericScore}%`;
            if (numericScore < 45) {
                hazardMeterFill.style.background = 'var(--green-500)';
            } else if (numericScore < 75) {
                hazardMeterFill.style.background = 'var(--orange-500)';
            } else {
                hazardMeterFill.style.background = '#ef4444';
            }
        }

        // Update advisor bullet points
        if (lblRiskAdvice) {
            lblRiskAdvice.innerHTML = '';
            state.locationAnalysis.advisories.forEach(adv => {
                const li = document.createElement('li');
                li.innerText = adv;
                lblRiskAdvice.appendChild(li);
            });
        }

        // RENDER RECOMMENDED HOUSE CARDS
        renderRecommendedHousesGrid(bData.risk);

        // DRAW DYNAMIC REGIONAL GIS VECTOR MAP
        drawInteractiveMap(provKey, cityKey, bKey);
    }

    function renderRecommendedHousesGrid(riskLevel) {
        if (!houseSelectionGrid) return;
        houseSelectionGrid.innerHTML = '';

        // Select houses based on location risk compatibility
        let list = [];
        if (riskLevel.includes('High')) {
            // High Risk: Recommend flood protector, elevated stilt house, family masonry, premium timber frame villa
            list = [state.houses.flood_protector, state.houses.elevated, state.houses.family, state.houses.wood_villa];
        } else if (riskLevel.includes('Moderate')) {
            // Moderate Risk: Recommend flood protector, elevated, eco-wood cabin, bungalow
            list = [state.houses.flood_protector, state.houses.elevated, state.houses.wood_cabin, state.houses.bungalow];
        } else {
            // Low Risk: Recommend all options
            list = [state.houses.flood_protector, state.houses.family, state.houses.bungalow, state.houses.wood_villa, state.houses.wood_cabin];
        }

        list.forEach(h => {
            // Calculate dynamic price based on default crew size of 2
            const defaultDays = h.baseDays;
            const laborCost = 2 * defaultDays * state.rates.labor;

            const mult = h.multipliers;
            let matCost = (mult.cement * state.rates.cement) +
                (mult.steel * state.rates.steel) +
                (mult.bricks * state.rates.bricks) +
                (mult.sand * state.rates.sand) +
                (mult.lumber * state.rates.wood) +
                (mult.roof * state.rates.roof) +
                (mult.paint * state.rates.paint) +
                (mult.fixtures * state.rates.fixtures);
            if (h.specialty > 0) {
                matCost += h.specialty;
            }

            const baseCost = matCost + laborCost;
            const permits = Math.round(baseCost * 0.05);
            const contingency = Math.round(baseCost * 0.07);
            const calculatedPrice = baseCost + permits + contingency;

            // Set dynamic price
            h.price = calculatedPrice;

            // Area-Based Construction Cost
            const areaRateMap = { standard: 20000, premium: 28000, luxury: 38500 };
            const areaTierLabel = { standard: 'STANDARD', premium: 'PREMIUM', luxury: 'LUXURY' };
            const areaTierColor = { standard: '#0369a1', premium: '#7c3aed', luxury: '#b45309' };
            const areaTierBg = { standard: '#e0f2fe', premium: '#ede9fe', luxury: '#fef3c7' };
            const tier = h.areaTier || 'standard';
            const areaRate = areaRateMap[tier];
            const areaCost = h.area * areaRate;

            const card = document.createElement('div');
            card.className = 'ai-house-card';
            card.style.cursor = 'pointer';
            card.style.border = '2px solid var(--sky-200)';
            card.style.borderRadius = 'var(--radius-md)';
            card.style.overflow = 'hidden';
            card.style.background = 'white';
            card.style.position = 'relative';
            card.style.transition = 'transform 0.18s ease, box-shadow 0.18s ease';
            card.onmouseenter = () => { card.style.transform = 'translateY(-3px)'; card.style.boxShadow = '0 8px 24px rgba(14,165,233,0.18)'; };
            card.onmouseleave = () => { card.style.transform = ''; card.style.boxShadow = ''; };

            // Special badge for wood designs
            let woodBadge = '';
            if (h.id.includes('wood')) {
                woodBadge = `<span style="position: absolute; top: 0.5rem; left: 0.5rem; background: #854d0e; color: white; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.65rem; font-weight: 700; font-family: var(--font-heading);"><i class="fa-solid fa-tree"></i> Timber</span>`;
            }

            card.innerHTML = `
                <div class="house-img-container" style="position: relative; height: 120px; overflow: hidden; background: #0b1329;">
                    <img src="${h.img}" alt="${h.name}" style="width: 100%; height: 100%; object-fit: cover;">
                    ${woodBadge}
                    <span style="position: absolute; top: 0.5rem; right: 0.5rem; background: var(--sky-500); color: white; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.65rem; font-weight: 700; font-family: var(--font-heading);"><i class="fa-solid fa-shield"></i> ${h.safetyScore} Safety</span>
                </div>
                <div class="house-details" style="padding: 0.75rem 0.85rem;">
                    <h4 class="house-price-label" style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--sky-700); font-weight: 800; line-height: 1; text-align: center; margin-bottom: 0.3rem;">₱${h.price.toLocaleString('en-US')}</h4>
                    <span style="font-size: 0.68rem; color: var(--slate-500); font-weight: 600; display: block; text-align: center; margin-bottom: 0.55rem;">${h.area} sqm &nbsp;|&nbsp; ${h.beds} Beds &nbsp;|&nbsp; ${h.baths} Baths</span>

                    <!-- Area Cost Breakdown -->
                    <div style="background: ${areaTierBg[tier]}; border-radius: 8px; padding: 0.45rem 0.6rem; border: 1px solid ${areaTierColor[tier]}22;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                            <span style="font-size: 0.6rem; font-weight: 800; color: ${areaTierColor[tier]}; font-family: var(--font-heading); letter-spacing: 0.5px;">
                                <i class="fa-solid fa-ruler-combined" style="margin-right:2px;"></i> AREA COST
                            </span>
                            <span style="background: ${areaTierColor[tier]}; color: white; font-size: 0.55rem; font-weight: 700; padding: 0.1rem 0.35rem; border-radius: 20px; font-family: var(--font-heading);">${areaTierLabel[tier]}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                            <div>
                                <div style="font-size: 0.6rem; color: #64748b;">${h.area} m² × ₱${areaRate.toLocaleString('en-US')}/m²</div>
                            </div>
                            <div style="font-size: 0.88rem; font-weight: 800; color: ${areaTierColor[tier]}; font-family: var(--font-heading);">₱${areaCost.toLocaleString('en-US')}</div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 0.3rem; margin-top: 0.4rem;">
                        <div style="flex: 1; background: #f1f5f9; border-radius: 6px; padding: 0.3rem; text-align: center;">
                            <div style="font-size: 0.55rem; color: #94a3b8; font-weight: 600;">MAT. COST</div>
                            <div style="font-size: 0.7rem; color: #0f172a; font-weight: 700;">₱${Math.round(matCost).toLocaleString('en-US')}</div>
                        </div>
                        <div style="flex: 1; background: #f1f5f9; border-radius: 6px; padding: 0.3rem; text-align: center;">
                            <div style="font-size: 0.55rem; color: #94a3b8; font-weight: 600;">LABOR</div>
                            <div style="font-size: 0.7rem; color: #0f172a; font-weight: 700;">₱${Math.round(laborCost).toLocaleString('en-US')}</div>
                        </div>
                        <div style="flex: 1; background: #f1f5f9; border-radius: 6px; padding: 0.3rem; text-align: center;">
                            <div style="font-size: 0.55rem; color: #94a3b8; font-weight: 600;">DURATION</div>
                            <div style="font-size: 0.7rem; color: #0f172a; font-weight: 700;">${Math.ceil(h.baseDays / 5)}wk</div>
                        </div>
                    </div>
                </div>
            `;

            // Card click transitions wizard to Step 2
            card.addEventListener('click', () => {
                state.activeHouse = h.id;
                transitionWizard(2);
            });

            houseSelectionGrid.appendChild(card);
        });
    }

    // -------------------------------------------------------------
    // WIZARD VIEW TRANSITIONS
    // -------------------------------------------------------------
    function transitionWizard(stepNum) {
        const housePhotoAnalyzerSection = document.getElementById('housePhotoAnalyzerSection');
        if (stepNum === 1) {
            // Show Step 1 screen, hide Step 2
            step1Container.style.display = 'block';
            if (housePhotoAnalyzerSection) housePhotoAnalyzerSection.style.display = 'block';
            step2Container.style.display = 'none';

            // Update navigation bar progress badges (handled by CSS classes)
            stepIndicator1.classList.add('active');
            stepIndicator2.classList.remove('active');

            wizardProgressBar.style.width = '0%';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Show Step 2, hide Step 1 & hide House Photo Analyzer
            step1Container.style.display = 'none';
            if (housePhotoAnalyzerSection) housePhotoAnalyzerSection.style.display = 'none';
            step2Container.style.display = 'block';

            // Update navigation bar progress badges (handled by CSS classes)
            stepIndicator1.classList.remove('active');
            stepIndicator2.classList.add('active');

            wizardProgressBar.style.width = '100%';

            // Populate Step 2 cost sheets & specs
            updateStep2Estimate();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Expose wizard transition globally so photo upload can trigger it
    window.transitionWizard = transitionWizard;
    window.systemState = state;
    window.updateStep2Estimate = updateStep2Estimate;
    window.calculateHouseProposal = calculateHouseProposal;

    // -------------------------------------------------------------
    // PHASE 3 & 4: ESTIMATOR AND DYNAMIC LABOR ENGINE
    // -------------------------------------------------------------
    function updateStep2Estimate() {
        const house = state.houses[state.activeHouse];
        if (!house) return;

        // Setup Location and visual displays
        if (step2Location) {
            step2Location.innerText = `${state.barangay}, ${state.city}, ${state.province}`;
        }
        if (step2HousePrice) {
            step2HousePrice.innerText = `₱${house.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        }

        const customPhotoControls = document.getElementById('customPhotoControls');
        const btnChangePhotoInStep2 = document.getElementById('btnChangePhotoInStep2');
        const step2HouseBadge = document.getElementById('step2HouseBadge');
        const step2BlueprintBadge = document.getElementById('step2BlueprintBadge');
        const step2BlueprintSvg = document.getElementById('step2BlueprintSvg');

        if (state.activeHouse === 'custom_photo') {
            // Display uploaded house photo
            if (step2HouseImg) {
                step2HouseImg.src = house.img;
                step2HouseImg.style.filter = 'none';
            }
            if (step2HouseBadge) {
                step2HouseBadge.innerText = 'UPLOADED HOUSE PHOTO';
                step2HouseBadge.style.background = 'linear-gradient(90deg, #0ea5e9, #7c3aed)';
            }
            if (btnChangePhotoInStep2) {
                btnChangePhotoInStep2.style.display = 'inline-flex';
            }

            // Display generated architectural floor plan blueprint
            if (step2BlueprintImg) step2BlueprintImg.style.display = 'none';
            if (step2BlueprintSvg) {
                step2BlueprintSvg.style.display = 'block';
                drawPhotoBlueprint(house.area, house.floors, 'step2BlueprintSvg');
            }
            if (step2BlueprintBadge) {
                step2BlueprintBadge.innerText = 'AI BLUEPRINT';
                step2BlueprintBadge.style.background = 'linear-gradient(90deg, #0ea5e9, #7c3aed)';
            }

            // Display parameter adjustment controls for photo house
            if (customPhotoControls) customPhotoControls.style.display = 'block';
        } else {
            // Preset house from Recommended AI Designs
            if (step2HouseImg) {
                step2HouseImg.src = house.img;
                if (state.activeHouse === 'seismic') {
                    step2HouseImg.style.filter = 'hue-rotate(50deg)';
                } else if (state.activeHouse === 'wood_villa') {
                    step2HouseImg.style.filter = 'sepia(0.2) saturate(1.2) hue-rotate(-20deg)';
                } else {
                    step2HouseImg.style.filter = 'none';
                }
            }
            if (step2HouseBadge) {
                step2HouseBadge.innerText = 'AI RENDER';
                step2HouseBadge.style.background = 'rgba(0,0,0,0.6)';
            }
            if (btnChangePhotoInStep2) {
                btnChangePhotoInStep2.style.display = 'none';
            }

            // Display preset blueprint image
            if (step2BlueprintSvg) step2BlueprintSvg.style.display = 'none';
            if (step2BlueprintImg) {
                step2BlueprintImg.style.display = 'block';
                step2BlueprintImg.src = house.blueprint;
            }
            if (step2BlueprintBadge) {
                step2BlueprintBadge.innerText = 'PLAN DRAFT';
                step2BlueprintBadge.style.background = 'rgba(0,0,0,0.6)';
            }

            // Hide photo adjustment controls for recommended presets
            if (customPhotoControls) customPhotoControls.style.display = 'none';
        }

        // Sync Phase 3 Specifications
        if (printFoundationType) printFoundationType.innerText = house.foundation;
        if (printWallMaterial) printWallMaterial.innerText = house.walls;
        if (printRoofMaterial) printRoofMaterial.innerText = house.roof;

        if (printRiskAdapt1) printRiskAdapt1.innerText = house.adaptations[0] || '';
        if (printRiskAdapt2) printRiskAdapt2.innerText = house.adaptations[1] || '';
        if (printRiskAdapt3) printRiskAdapt3.innerText = house.adaptations[2] || '';

        // Workforce slider configuration
        if (!state.crewSize) state.crewSize = 2;
        if (laborCrewSlider) laborCrewSlider.value = state.crewSize;
        if (laborCrewLabel) laborCrewLabel.innerText = `${state.crewSize} Workers`;
        if (sysCrewBadge) sysCrewBadge.innerText = `${state.crewSize} Workers`;
        updateWorkforcePlanText(state.crewSize);

        // Recalculate cost table
        calculateHouseProposal();
    }

    function calculateDuration(baseDays, crewSize) {
        if (crewSize === 2) return baseDays;
        if (crewSize === 4) return Math.ceil(baseDays * 0.67);
        if (crewSize === 6) return Math.ceil(baseDays * 0.45);
        return Math.ceil(baseDays * (3 / crewSize));
    }

    function calculateHouseProposal() {
        const house = state.houses[state.activeHouse];
        if (!house) return;

        // Dynamic Labor schedule days (Phase 4 Labor)
        const daysRequired = calculateDuration(house.baseDays, state.crewSize);

        if (laborTimeDuration) {
            laborTimeDuration.innerText = `${daysRequired} Working Days (AI Calibrated)`;
        }

        // labor daily cost calculations
        const totalLaborCost = state.crewSize * daysRequired * state.rates.labor;

        // Compile material list (Phase 4 Materials)
        const mult = house.multipliers;
        const matItems = [
            { name: 'Portland Cement (Base Structural)', qty: mult.cement, unit: 'Bags', rate: state.rates.cement, cost: mult.cement * state.rates.cement },
            { name: 'Deformed Steel Bars (Structural rebars)', qty: mult.steel, unit: 'kg', rate: state.rates.steel, cost: mult.steel * state.rates.steel },
            { name: 'CHB Hollow Concrete Blocks (Walls)', qty: mult.bricks, unit: 'pcs', rate: state.rates.bricks, cost: mult.bricks * state.rates.bricks },
            { name: 'Coarse Sand & Gravel (Footings foundation)', qty: mult.sand, unit: 'm³', rate: state.rates.sand, cost: mult.sand * state.rates.sand },
            { name: 'Coco Structural Lumber (Scaffold framing)', qty: mult.lumber, unit: 'bd ft', rate: state.rates.wood, cost: mult.lumber * state.rates.wood },
            { name: 'Pre-painted GI Roof Panels (Roof envelope)', qty: mult.roof, unit: 'm²', rate: state.rates.roof, cost: mult.roof * state.rates.roof },
            { name: 'Davies Latex Coatings (Interior/Exterior paint)', qty: mult.paint, unit: 'Liters', rate: state.rates.paint, cost: mult.paint * state.rates.paint },
            { name: 'Plumbing & Electrical Fixtures (Utilities Pack)', qty: mult.fixtures, unit: 'Sets', rate: state.rates.fixtures, cost: mult.fixtures * state.rates.fixtures }
        ];

        // Add specialty concrete stilt surcharge for elevated house
        if (house.specialty > 0) {
            let label = 'Specialty Concrete Stilt Columns (Elevated Foundations)';
            if (state.activeHouse === 'wood_villa') {
                label = 'Specialty High-Tensile Steel Bracing Package';
            } else if (state.activeHouse === 'flood_protector') {
                label = 'Specialty High-Elevated Stilt Surge Columns';
            }
            matItems.push({ name: label, qty: 1, unit: 'Unit', rate: house.specialty, cost: house.specialty });
        }

        const totalMaterialsCost = matItems.reduce((sum, item) => sum + item.cost, 0);

        // ── Area-Based Construction Cost ──────────────────────────────
        const areaRateMap2 = { standard: 20000, premium: 28000, luxury: 38500 };
        const areaTierLabels2 = { standard: 'Standard Spec  ₱20,000/m²', premium: 'Premium Spec  ₱28,000/m²', luxury: 'Luxury Spec  ₱38,500/m²' };
        const areaTierColors2 = { standard: '#0369a1', premium: '#7c3aed', luxury: '#b45309' };
        const hTier = house.areaTier || 'standard';
        const areaRateVal = areaRateMap2[hTier];
        const areaCostVal = house.area * areaRateVal;

        function calculatedBasePrice() {
            return totalMaterialsCost + totalLaborCost;
        }

        // Permits & Contingency estimations (12% standard capstone margin)
        const permitsCost = Math.round(calculatedBasePrice() * 0.05);
        const contingencyCost = Math.round(calculatedBasePrice() * 0.07);

        // Final aggregated complete house budget (includes area cost)
        const finalCalculatedCost = totalMaterialsCost + totalLaborCost + areaCostVal + permitsCost + contingencyCost;

        // Sync dynamic final price back to display label
        if (step2HousePrice) {
            step2HousePrice.innerText = `₱${finalCalculatedCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        }

        // Render Step 2 Cost table
        if (step2MaterialsBody) {
            step2MaterialsBody.innerHTML = '';

            // Materials rows
            matItems.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="font-size: 0.8rem; padding: 0.45rem 0.75rem; color: var(--slate-800); font-weight: 500;">${item.name}</td>
                    <td style="font-size: 0.8rem; padding: 0.45rem 0.75rem; color: var(--slate-500); font-weight: 600;">${item.qty.toLocaleString()} ${item.unit}</td>
                    <td style="font-size: 0.8rem; padding: 0.45rem 0.75rem; color: var(--slate-900); font-weight: 700;" class="text-right">₱${item.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                `;
                step2MaterialsBody.appendChild(tr);
            });

            // Dynamic Labor row
            const laborTr = document.createElement('tr');
            laborTr.style.background = 'rgba(14, 165, 233, 0.03)';
            laborTr.innerHTML = `
                <td style="font-size: 0.8rem; padding: 0.5rem 0.75rem; color: var(--sky-700); font-weight: 700;"><i class="fa-solid fa-people-carry-box"></i> Dynamic Construction Labor Cost</td>
                <td style="font-size: 0.8rem; padding: 0.5rem 0.75rem; color: var(--sky-600); font-weight: 700;">${state.crewSize} Workers (${daysRequired} Days)</td>
                <td style="font-size: 0.8rem; padding: 0.5rem 0.75rem; color: var(--sky-700); font-weight: 800;" class="text-right">₱${totalLaborCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            `;
            step2MaterialsBody.appendChild(laborTr);

            // ── Area-Based Construction Cost row ──────────────────────
            const areaTr = document.createElement('tr');
            areaTr.style.background = `${areaTierColors2[hTier]}0d`;
            areaTr.style.borderLeft = `3px solid ${areaTierColors2[hTier]}`;
            areaTr.innerHTML = `
                <td style="font-size: 0.8rem; padding: 0.5rem 0.75rem; font-weight: 700; color: ${areaTierColors2[hTier]};"><i class="fa-solid fa-ruler-combined"></i> Area-Based Construction Cost</td>
                <td style="font-size: 0.8rem; padding: 0.5rem 0.75rem; color: ${areaTierColors2[hTier]}; font-weight: 600;">${house.area} m² × ₱${areaRateVal.toLocaleString('en-US')} — ${areaTierLabels2[hTier]}</td>
                <td style="font-size: 0.8rem; padding: 0.5rem 0.75rem; font-weight: 800; color: ${areaTierColors2[hTier]};" class="text-right">₱${areaCostVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            `;
            step2MaterialsBody.appendChild(areaTr);

            // Permits & Contingency row
            const permitsTr = document.createElement('tr');
            permitsTr.innerHTML = `
                <td style="font-size: 0.8rem; padding: 0.45rem 0.75rem; color: var(--slate-600); font-weight: 500;"><i class="fa-solid fa-file-contract"></i> Government Permits &amp; Insurance</td>
                <td style="font-size: 0.8rem; padding: 0.45rem 0.75rem; color: var(--slate-500); font-weight: 600;">Standard Capstone Margin</td>
                <td style="font-size: 0.8rem; padding: 0.45rem 0.75rem; color: var(--slate-900); font-weight: 700;" class="text-right">₱${permitsCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            `;
            step2MaterialsBody.appendChild(permitsTr);

            const contingencyTr = document.createElement('tr');
            contingencyTr.innerHTML = `
                <td style="font-size: 0.8rem; padding: 0.45rem 0.75rem; color: var(--slate-600); font-weight: 500;"><i class="fa-solid fa-triangle-exclamation"></i> Emergency Construction Contingency</td>
                <td style="font-size: 0.8rem; padding: 0.45rem 0.75rem; color: var(--slate-500); font-weight: 600;">7% Buffer</td>
                <td style="font-size: 0.8rem; padding: 0.45rem 0.75rem; color: var(--slate-900); font-weight: 700;" class="text-right">₱${contingencyCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            `;
            step2MaterialsBody.appendChild(contingencyTr);

            // ── Grand Total row ───────────────────────────────────────
            const totalTr = document.createElement('tr');
            totalTr.style.background = 'var(--sky-50)';
            totalTr.style.borderTop = '2px solid var(--sky-300)';
            totalTr.innerHTML = `
                <td style="font-size: 0.85rem; padding: 0.6rem 0.75rem; color: var(--slate-900); font-weight: 800;">TOTAL ESTIMATED BUDGET</td>
                <td style="font-size: 0.75rem; padding: 0.6rem 0.75rem; color: var(--slate-500); font-weight: 600;">Area Cost + Mat. Cost + Labor + Permits &amp; Contingency</td>
                <td style="font-size: 0.9rem; padding: 0.6rem 0.75rem; color: var(--sky-800); font-weight: 900;" class="text-right">₱${finalCalculatedCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            `;
            step2MaterialsBody.appendChild(totalTr);
        }
    }

    // -------------------------------------------------------------
    // PHASE 7: EXPORT PRINTABLE CAPSTONE PROSPECTUS
    // -------------------------------------------------------------
    function openFinalReportModal() {
        const house = state.houses[state.activeHouse];
        if (!house) return;

        // Capture dynamic values from estimator
        const daysRequired = calculateDuration(house.baseDays, state.crewSize);
        const totalLaborCost = state.crewSize * daysRequired * state.rates.labor;
        // Re-compile item rows to copy to printed page
        const mult = house.multipliers;
        const matItems = [
            { name: 'Portland Cement (Base Structural)', qty: mult.cement, unit: 'Bags', rate: state.rates.cement, cost: mult.cement * state.rates.cement },
            { name: 'Deformed Steel Bars (Structural rebars)', qty: mult.steel, unit: 'kg', rate: state.rates.steel, cost: mult.steel * state.rates.steel },
            { name: 'CHB Hollow Concrete Blocks (Walls)', qty: mult.bricks, unit: 'pcs', rate: state.rates.bricks, cost: mult.bricks * state.rates.bricks },
            { name: 'Sand & Gravel (Footings foundation)', qty: mult.sand, unit: 'm³', rate: state.rates.sand, cost: mult.sand * state.rates.sand },
            { name: 'Coco Structural Lumber (Scaffold framing)', qty: mult.lumber, unit: 'bd ft', rate: state.rates.wood, cost: mult.lumber * state.rates.wood },
            { name: 'Pre-painted GI Roof Panels', qty: mult.roof, unit: 'm²', rate: state.rates.roof, cost: mult.roof * state.rates.roof },
            { name: 'Davies Latex Coatings (Wall paints)', qty: mult.paint, unit: 'Liters', rate: state.rates.paint, cost: mult.paint * state.rates.paint },
            { name: 'Plumbing & Electrical Fixtures Pack', qty: mult.fixtures, unit: 'Sets', rate: state.rates.fixtures, cost: mult.fixtures * state.rates.fixtures }
        ];
        if (house.specialty > 0) {
            let label = 'Specialty Concrete Stilt Columns';
            if (state.activeHouse === 'wood_villa') {
                label = 'Specialty Steel Bracing Surcharges';
            } else if (state.activeHouse === 'flood_protector') {
                label = 'Specialty High-Elevated Stilt Surge Columns';
            }
            matItems.push({ name: label, qty: 1, unit: 'Unit', rate: house.specialty, cost: house.specialty });
        }

        const totalMaterialsCost = matItems.reduce((sum, item) => sum + item.cost, 0);
        const baseCost = totalMaterialsCost + totalLaborCost;
        const permitsCost = Math.round(baseCost * 0.05);
        const contingencyCost = Math.round(baseCost * 0.07);
        // Area cost for print report
        const areaRateMapP = { standard: 20000, premium: 28000, luxury: 38500 };
        const areaCostPrint = house.area * (areaRateMapP[house.areaTier || 'standard']);
        const finalTotalPriceVal = baseCost + areaCostPrint + permitsCost + contingencyCost;

        // Hydrate Phase 7 Printable summary elements
        if (printProvince) printProvince.innerText = state.province;
        if (printCity) printCity.innerText = state.city;
        if (printBarangay) printBarangay.innerText = state.barangay;
        if (printRiskRating) printRiskRating.innerText = state.locationAnalysis.title.replace('Location Status: ', '');

        if (printArea) printArea.innerText = `${house.area} sqm`;
        if (printBedBaths) printBedBaths.innerText = `${house.beds} Bedrooms / ${house.baths} Bathrooms`;
        if (printWalls) printWalls.innerText = house.walls;
        if (printRoof) printRoof.innerText = house.roof;

        if (printGisScore) printGisScore.innerText = state.locationAnalysis.gisScore;
        if (printGisDesc) {
            printGisDesc.innerText = `Geospatial coordinates assessed inside ${state.barangay}, ${state.city}. Risk profile reveals Flood Risk: ${state.locationAnalysis.flood} and Seismic proximity: ${state.locationAnalysis.seismic}. Appropriate foundation adaptations applied.`;
        }

        if (printCrew) printCrew.innerText = `${state.crewSize} Workers`;
        if (printDuration) printDuration.innerText = `${daysRequired} Working Days`;
        if (printTotalPrice) {
            printTotalPrice.innerText = `₱${finalTotalPriceVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        }

        // Sync blueprint visual renders in print pane
        const printHouseImg = document.getElementById('printHouseImg');
        const printBlueprintImg = document.getElementById('printBlueprintImg');
        if (printHouseImg) {
            printHouseImg.src = house.img;
            if (state.activeHouse === 'seismic') {
                printHouseImg.style.filter = 'hue-rotate(50deg)';
            } else if (state.activeHouse === 'wood_villa') {
                printHouseImg.style.filter = 'sepia(0.2) saturate(1.2) hue-rotate(-20deg)';
            } else {
                printHouseImg.style.filter = 'none';
            }
        }
        if (printBlueprintImg) {
            if (state.activeHouse === 'custom_photo') {
                const svgEl = document.getElementById('step2BlueprintSvg');
                if (svgEl) {
                    const svgXml = new XMLSerializer().serializeToString(svgEl);
                    printBlueprintImg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgXml);
                }
            } else {
                printBlueprintImg.src = house.blueprint;
            }
        }

        // Set generated report timestamp
        const dateObj = new Date();
        if (printSysDateString) {
            printSysDateString.innerText = `Generated Report Date: ${dateObj.toLocaleDateString()} @ ${dateObj.toLocaleTimeString()}`;
        }

        // Hydrate printed breakdown table body
        if (printMaterialsTableBody) {
            printMaterialsTableBody.innerHTML = '';

            // Materials
            matItems.forEach(item => {
                const tr = document.createElement('tr');
                tr.style.borderBottom = '1px solid var(--slate-100)';
                tr.innerHTML = `
                    <td style="padding: 0.4rem 0;"><strong>${item.name}</strong></td>
                    <td style="padding: 0.4rem 0;">${item.qty.toLocaleString()} ${item.unit}</td>
                    <td style="padding: 0.4rem 0; text-align: right;">₱${item.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                `;
                printMaterialsTableBody.appendChild(tr);
            });

            // Labor
            const laborTr = document.createElement('tr');
            laborTr.style.borderBottom = '1px solid var(--slate-100)';
            laborTr.innerHTML = `
                <td style="padding: 0.4rem 0;"><strong>Labor Cost (${state.crewSize} Workers)</strong></td>
                <td style="padding: 0.4rem 0;">${daysRequired} Days @ ₱650/day</td>
                <td style="padding: 0.4rem 0; text-align: right;">₱${totalLaborCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            `;
            printMaterialsTableBody.appendChild(laborTr);

            // Permits
            const permitsTr = document.createElement('tr');
            permitsTr.style.borderBottom = '1px solid var(--slate-100)';
            permitsTr.innerHTML = `
                <td style="padding: 0.4rem 0;"><strong>Permits &amp; Environmental Clearance</strong></td>
                <td style="padding: 0.4rem 0;">5% Base Allowance</td>
                <td style="padding: 0.4rem 0; text-align: right;">₱${permitsCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            `;
            printMaterialsTableBody.appendChild(permitsTr);

            // Contingency
            const contingencyTr = document.createElement('tr');
            contingencyTr.style.borderBottom = '1px solid var(--slate-100)';
            contingencyTr.innerHTML = `
                <td style="padding: 0.4rem 0;"><strong>Contingency Buffer</strong></td>
                <td style="padding: 0.4rem 0;">7% Emergency Margin</td>
                <td style="padding: 0.4rem 0; text-align: right;">₱${contingencyCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            `;
            printMaterialsTableBody.appendChild(contingencyTr);

            // Grand Total Sum Row
            const totalTr = document.createElement('tr');
            totalTr.style.borderTop = '2.5px double var(--sky-500)';
            totalTr.innerHTML = `
                <td style="padding: 0.6rem 0; font-size: 0.8rem;"><strong>TOTAL PLAN ESTIMATE</strong></td>
                <td style="padding: 0.6rem 0; font-size: 0.8rem;"><strong>Complete House</strong></td>
                <td style="padding: 0.6rem 0; font-size: 0.85rem; text-align: right; color: var(--sky-700);"><strong>₱${finalTotalPriceVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></td>
            `;
            printMaterialsTableBody.appendChild(totalTr);
        }

        // Open Modal Display
        if (sysExportModal) sysExportModal.style.display = 'flex';
    }

    // Lightbox modal functionality
    const imageLightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const btnCloseLightbox = document.getElementById('btnCloseLightbox');
    const lightboxSvgWrapper = document.getElementById('lightboxSvgWrapper');
    const lightboxSvgInner = document.getElementById('lightboxSvgInner');
    const lightboxSvgTitle = document.getElementById('lightboxSvgTitle');
    const lightboxSvgSubtitle = document.getElementById('lightboxSvgSubtitle');

    let currentBpZoom = 1.0;
    function applyBlueprintModalZoom() {
        if (lightboxSvgInner) {
            lightboxSvgInner.style.transform = `scale(${currentBpZoom})`;
        }
    }

    function openBlueprintLightbox(title, subtitle) {
        if (!imageLightbox) return;
        const step2Svg = document.getElementById('step2BlueprintSvg');
        if (lightboxImg) lightboxImg.style.display = 'none';

        if (lightboxSvgWrapper && lightboxSvgInner && step2Svg) {
            lightboxSvgWrapper.style.display = 'flex';
            // Inject a clean clone of the blueprint SVG
            lightboxSvgInner.innerHTML = step2Svg.outerHTML;
            const clonedSvg = lightboxSvgInner.querySelector('svg');
            if (clonedSvg) {
                clonedSvg.removeAttribute('id');
                clonedSvg.style.display = 'block';
                clonedSvg.style.width = '100%';
                clonedSvg.style.height = '100%';
                clonedSvg.style.maxWidth = '1250px';
                clonedSvg.style.maxHeight = '74vh';
                clonedSvg.style.borderRadius = '6px';
            }
            currentBpZoom = 1.0;
            applyBlueprintModalZoom();

            if (lightboxSvgTitle) lightboxSvgTitle.innerText = title || 'AI ARCHITECTURAL FLOOR PLAN BLUEPRINT';
            if (lightboxSvgSubtitle && subtitle) lightboxSvgSubtitle.innerText = subtitle;
            if (lightboxCaption) lightboxCaption.style.display = 'none';

            imageLightbox.style.display = 'flex';
            setTimeout(() => {
                imageLightbox.style.opacity = '1';
            }, 30);
        } else if (step2Svg) {
            const svgXml = new XMLSerializer().serializeToString(step2Svg);
            const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgXml);
            openLightbox(svgDataUrl, title || 'AI Architectural Floor Plan Blueprint');
        }
    }

    // Zoom and pan buttons for the blueprint drafting viewer
    const btnBpZoomIn = document.getElementById('btnBpZoomIn');
    if (btnBpZoomIn) {
        btnBpZoomIn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentBpZoom = Math.min(currentBpZoom + 0.25, 3.2);
            applyBlueprintModalZoom();
        });
    }

    const btnBpZoomOut = document.getElementById('btnBpZoomOut');
    if (btnBpZoomOut) {
        btnBpZoomOut.addEventListener('click', (e) => {
            e.stopPropagation();
            currentBpZoom = Math.max(currentBpZoom - 0.25, 0.6);
            applyBlueprintModalZoom();
        });
    }

    const btnBpReset = document.getElementById('btnBpReset');
    if (btnBpReset) {
        btnBpReset.addEventListener('click', (e) => {
            e.stopPropagation();
            currentBpZoom = 1.0;
            applyBlueprintModalZoom();
        });
    }

    const btnBpDownload = document.getElementById('btnBpDownload');
    if (btnBpDownload) {
        btnBpDownload.addEventListener('click', (e) => {
            e.stopPropagation();
            const step2Svg = document.getElementById('step2BlueprintSvg');
            if (!step2Svg) return;
            const svgData = new XMLSerializer().serializeToString(step2Svg);
            const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const curH = state.houses[state.activeHouse];
            const area = curH ? Math.round(curH.area) : 60;
            a.download = `Architectural_Blueprint_${area}sqm.svg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // Button to open Large Blueprint View
    const btnFullscreenBlueprint = document.getElementById('btnFullscreenBlueprint');
    if (btnFullscreenBlueprint) {
        btnFullscreenBlueprint.addEventListener('click', () => {
            const curH = state.houses[state.activeHouse];
            const area = curH ? Math.round(curH.area) : 60;
            const beds = curH ? curH.beds : 2;
            const flrs = curH ? curH.floors : 1;
            openBlueprintLightbox(
                `AI ARCHITECTURAL FLOOR PLAN — ${area} SQ.M. TECHNICAL SPECIFICATIONS`,
                `${beds}-Bedroom ${flrs > 1 ? flrs + '-Storey' : 'Bungalow'} • Scale 1:75 • Davao Regional Building Code Aligned`
            );
        });
    }

    if (step2HouseImg) {
        step2HouseImg.addEventListener('click', () => {
            const house = state.houses[state.activeHouse];
            if (house) {
                const title = house.id === 'custom_photo' ? 'Uploaded House Photo - Live Analysis' : `${house.name} - AI Render`;
                openLightbox(house.img, title);
            }
        });
    }

    if (step2BlueprintImg) {
        step2BlueprintImg.addEventListener('click', () => {
            if (state.activeHouse === 'custom_photo') {
                const curH = state.houses['custom_photo'];
                const area = curH ? Math.round(curH.area) : 60;
                openBlueprintLightbox(`AI ARCHITECTURAL FLOOR PLAN — ${area} SQ.M. TECHNICAL DRAFT`);
            } else {
                const house = state.houses[state.activeHouse];
                if (house) {
                    openLightbox(house.blueprint, `${house.name} - Technical Blueprint Plan`);
                }
            }
        });
    }

    const step2BlueprintSvg = document.getElementById('step2BlueprintSvg');
    if (step2BlueprintSvg) {
        step2BlueprintSvg.style.cursor = 'zoom-in';
        step2BlueprintSvg.addEventListener('click', () => {
            const curH = state.houses[state.activeHouse];
            const area = curH ? Math.round(curH.area) : 60;
            openBlueprintLightbox(`AI ARCHITECTURAL FLOOR PLAN — ${area} SQ.M. TECHNICAL DRAFT`);
        });
    }

    const step2BlueprintBadge = document.getElementById('step2BlueprintBadge');
    if (step2BlueprintBadge) {
        step2BlueprintBadge.addEventListener('click', () => {
            if (state.activeHouse === 'custom_photo') {
                const curH = state.houses['custom_photo'];
                const area = curH ? Math.round(curH.area) : 60;
                openBlueprintLightbox(`AI ARCHITECTURAL FLOOR PLAN — ${area} SQ.M. TECHNICAL DRAFT`);
            } else {
                const house = state.houses[state.activeHouse];
                if (house) openLightbox(house.blueprint, `${house.name} - Technical Blueprint Plan`);
            }
        });
    }

    function openLightbox(src, caption) {
        if (!imageLightbox) return;
        if (lightboxSvgWrapper) lightboxSvgWrapper.style.display = 'none';
        if (lightboxImg) {
            lightboxImg.style.display = 'block';
            lightboxImg.src = src;
        }
        if (lightboxCaption) {
            lightboxCaption.style.display = 'block';
            lightboxCaption.innerText = caption;
        }
        imageLightbox.style.display = 'flex';
        setTimeout(() => {
            imageLightbox.style.opacity = '1';
            if (lightboxImg) lightboxImg.style.transform = 'scale(1)';
        }, 50);
    }

    function closeLightbox() {
        if (!imageLightbox) return;
        imageLightbox.style.opacity = '0';
        if (lightboxImg) lightboxImg.style.transform = 'scale(0.95)';
        currentBpZoom = 1.0;
        applyBlueprintModalZoom();
        setTimeout(() => {
            imageLightbox.style.display = 'none';
            if (lightboxSvgWrapper) lightboxSvgWrapper.style.display = 'none';
            if (lightboxImg) lightboxImg.style.display = 'block';
            if (lightboxCaption) lightboxCaption.style.display = 'block';
        }, 300);
    }

    if (btnCloseLightbox) {
        btnCloseLightbox.addEventListener('click', closeLightbox);
    }

    if (imageLightbox) {
        imageLightbox.addEventListener('click', (e) => {
            if (e.target === imageLightbox) {
                closeLightbox();
            }
        });
    }

    // -------------------------------------------------------------
    // INTERACTIVE SVG REGIONAL GIS MAP DRAWING
    // -------------------------------------------------------------
    const MAP_COORDS = {
        davao_norte: {
            panabo: {
                san_vicente: { x: 120, y: 75, lat: "7.3075° N", lon: "125.6853° E" },
                gredu: { x: 115, y: 78, lat: "7.2995° N", lon: "125.6800° E" },
                new_pandan: { x: 112, y: 82, lat: "7.2882° N", lon: "125.6720° E" },
                quezon: { x: 108, y: 70, lat: "7.3150° N", lon: "125.6601° E" }
            },
            tagum: {
                apokon: { x: 180, y: 60, lat: "7.4421° N", lon: "125.8202° E" },
                mankilam: { x: 172, y: 54, lat: "7.4582° N", lon: "125.7955° E" },
                visayan_village: { x: 184, y: 52, lat: "7.4611° N", lon: "125.8115° E" },
                magugpo_west: { x: 168, y: 58, lat: "7.4390° N", lon: "125.7890° E" }
            },
            samal: {
                babak: { x: 146, y: 102, lat: "7.1180° N", lon: "125.7320° E" },
                penaplata: { x: 142, y: 112, lat: "7.0650° N", lon: "125.7110° E" },
                kaputian: { x: 138, y: 124, lat: "6.9850° N", lon: "125.6980° E" },
                villarica: { x: 148, y: 118, lat: "7.0420° N", lon: "125.7410° E" }
            },
            carmen: {
                ising: { x: 95, y: 70, lat: "7.3625° N", lon: "125.6983° E" },
                alejal: { x: 91, y: 74, lat: "7.3501° N", lon: "125.6880° E" },
                magsaysay: { x: 88, y: 78, lat: "7.3392° N", lon: "125.6750° E" },
                tuganay: { x: 93, y: 66, lat: "7.3780° N", lon: "125.7090° E" }
            },
            sto_tomas: {
                tibal_on: { x: 74, y: 44, lat: "7.5256° N", lon: "125.6369° E" },
                kimamon: { x: 70, y: 48, lat: "7.5110° N", lon: "125.6210° E" },
                san_miguel: { x: 78, y: 40, lat: "7.5420° N", lon: "125.6520° E" },
                new_visayas: { x: 82, y: 46, lat: "7.5190° N", lon: "125.6410° E" }
            }
        },
        davao_sur: {
            davao_city: {
                buhangin: { x: 130, y: 65, lat: "7.0736° N", lon: "125.6110° E" },
                talomo: { x: 115, y: 80, lat: "7.0220° N", lon: "125.5640° E" },
                agdao: { x: 138, y: 70, lat: "7.0850° N", lon: "125.6310° E" },
                toril: { x: 95, y: 105, lat: "6.9690° N", lon: "125.4980° E" },
                bajada: { x: 135, y: 72, lat: "7.0790° N", lon: "125.6180° E" }
            },
            digos: {
                tres_de_mayo: { x: 65, y: 120, lat: "6.7578° N", lon: "125.3556° E" },
                zone_1: { x: 60, y: 124, lat: "6.7450° N", lon: "125.3420° E" },
                matti: { x: 55, y: 116, lat: "6.7820° N", lon: "125.3190° E" },
                colorado: { x: 70, y: 112, lat: "6.7910° N", lon: "125.3810° E" }
            }
        },
        leyte: {
            tacloban: {
                anibong: { x: 170, y: 50, lat: "11.2444° N", lon: "125.0039° E" },
                diit: { x: 162, y: 45, lat: "11.2680° N", lon: "124.9780° E" },
                san_jose: { x: 180, y: 62, lat: "11.2050° N", lon: "125.0180° E" },
                marasbaras: { x: 172, y: 58, lat: "11.2180° N", lon: "124.9920° E" }
            },
            ormoc: {
                valencia: { x: 85, y: 90, lat: "11.0050° N", lon: "124.6078° E" },
                cogon: { x: 80, y: 94, lat: "10.9910° N", lon: "124.5910° E" },
                can_adieng: { x: 74, y: 98, lat: "10.9810° N", lon: "124.5750° E" },
                linao: { x: 88, y: 86, lat: "11.0250° N", lon: "124.6290° E" }
            }
        }
    };

    function drawInteractiveMap(provKey, cityKey, bKey) {
        if (!gisMapSvg) return;

        // Get coordinate details
        const pCoords = MAP_COORDS[provKey];
        if (!pCoords) return;
        const cCoords = pCoords[cityKey];
        if (!cCoords) return;
        const bCoords = cCoords[bKey];
        if (!bCoords) return;

        // Update Coordinates Display Label
        if (gisMapCoords) {
            gisMapCoords.innerText = `LAT: ${bCoords.lat} | LON: ${bCoords.lon}`;
        }

        // Get the active risk color based on data
        const provData = LOCATIONS[provKey];
        const cityData = provData.cities[cityKey];
        const bData = cityData.barangays[bKey];
        let pinColor = 'var(--green-500)';
        const riskText = bData.risk.toUpperCase();
        if (riskText.includes('HIGH')) {
            pinColor = '#ef4444';
        } else if (riskText.includes('MODERATE')) {
            pinColor = 'var(--orange-500)';
        }

        let mapContent = '';

        // Dynamic gradient and filter patterns
        mapContent += `
        <defs>
            <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.03" />
                <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.12" />
            </linearGradient>
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0284c7" stop-opacity="0.15" />
                <stop offset="50%" stop-color="#0369a1" stop-opacity="0.25" />
                <stop offset="100%" stop-color="#0c4a6e" stop-opacity="0.1" />
            </linearGradient>
        </defs>
        `;

        // Background Cyber-Grid with Crosshair layout
        mapContent += `
        <rect width="300" height="150" fill="url(#gridGradient)" />
        <g stroke="rgba(56, 189, 248, 0.08)" stroke-width="1">
            <line x1="50" y1="0" x2="50" y2="150" />
            <line x1="100" y1="0" x2="100" y2="150" />
            <line x1="150" y1="0" x2="150" y2="150" />
            <line x1="200" y1="0" x2="200" y2="150" />
            <line x1="250" y1="0" x2="250" y2="150" />
            <line x1="0" y1="30" x2="300" y2="30" />
            <line x1="0" y1="60" x2="300" y2="60" />
            <line x1="0" y1="90" x2="300" y2="90" />
            <line x1="0" y1="120" x2="300" y2="120" />
        </g>
        <rect x="5" y="5" width="290" height="140" fill="none" stroke="rgba(56, 189, 248, 0.15)" stroke-width="1" rx="4" />
        <path d="M 8 15 L 8 8 L 15 8" stroke="#38bdf8" stroke-width="1.5" fill="none" opacity="0.6" />
        <path d="M 292 15 L 292 8 L 285 8" stroke="#38bdf8" stroke-width="1.5" fill="none" opacity="0.6" />
        <path d="M 8 135 L 8 142 L 15 142" stroke="#38bdf8" stroke-width="1.5" fill="none" opacity="0.6" />
        <path d="M 292 135 L 292 142 L 285 142" stroke="#38bdf8" stroke-width="1.5" fill="none" opacity="0.6" />
        `;

        // Render distinct premium vector geographic designs per province
        if (provKey === 'davao_norte') {
            mapContent += `
            <path d="M 50 15 Q 120 10 180 30 T 230 60 Q 200 90 170 100 T 110 80 Q 70 80 50 15 Z" 
                  fill="url(#landGradient)" stroke="#0284c7" stroke-width="1.8" filter="url(#glow-effect)" />
            <path d="M 134 102 Q 155 92 155 115 T 138 128 Z" 
                  fill="url(#landGradient)" stroke="#0ea5e9" stroke-width="1.5" />
            <path d="M 160 120 C 170 122 180 120 190 122" stroke="rgba(56,189,248,0.15)" stroke-width="1" fill="none" />
            <path d="M 165 125 C 172 127 178 125 185 127" stroke="rgba(56,189,248,0.15)" stroke-width="1" fill="none" />
            
            <text x="35" y="32" fill="#e0f2fe" opacity="0.75" font-size="9" font-family="var(--font-heading)" font-weight="700" letter-spacing="1">DAVAO DEL NORTE</text>
            <text x="146" y="137" fill="#38bdf8" opacity="0.7" font-size="7" font-family="monospace">SAMAL ISLAND</text>
            <text x="210" y="110" fill="#38bdf8" opacity="0.4" font-size="8" font-style="italic">Davao Gulf</text>
            `;
        } else if (provKey === 'davao_sur') {
            mapContent += `
            <path d="M 50 20 Q 140 10 160 50 T 140 110 Q 110 130 90 135 T 50 90 Q 30 50 50 20 Z" 
                  fill="url(#landGradient)" stroke="#0284c7" stroke-width="1.8" filter="url(#glow-effect)" />
            <path d="M 165 85 C 175 87 185 85 195 87" stroke="rgba(56,189,248,0.15)" stroke-width="1" fill="none" />
            <path d="M 170 92 C 177 94 184 92 191 94" stroke="rgba(56,189,248,0.15)" stroke-width="1" fill="none" />

            <text x="35" y="32" fill="#e0f2fe" opacity="0.75" font-size="9" font-family="var(--font-heading)" font-weight="700" letter-spacing="1">DAVAO DEL SUR</text>
            <text x="110" y="65" fill="#38bdf8" opacity="0.7" font-size="7.5" font-family="monospace">DAVAO CITY</text>
            <text x="180" y="75" fill="#38bdf8" opacity="0.4" font-size="8" font-style="italic">Davao Gulf</text>
            `;
        } else if (provKey === 'leyte') {
            mapContent += `
            <path d="M 60 120 Q 90 110 120 70 T 180 30 Q 195 20 205 35 T 160 85 Q 120 115 95 135 Z" 
                  fill="url(#landGradient)" stroke="#0284c7" stroke-width="1.8" filter="url(#glow-effect)" />
            <path d="M 210 65 C 220 67 230 65 240 67" stroke="rgba(56,189,248,0.15)" stroke-width="1" fill="none" />
            <path d="M 215 71 C 222 73 229 71 236 73" stroke="rgba(56,189,248,0.15)" stroke-width="1" fill="none" />

            <text x="35" y="32" fill="#e0f2fe" opacity="0.75" font-size="9" font-family="var(--font-heading)" font-weight="700" letter-spacing="1">LEYTE ISLAND</text>
            <text x="185" y="55" fill="#38bdf8" opacity="0.7" font-size="7" font-family="monospace">TACLOBAN</text>
            <text x="62" y="85" fill="#38bdf8" opacity="0.7" font-size="7" font-family="monospace">ORMOC</text>
            <text x="210" y="105" fill="#38bdf8" opacity="0.4" font-size="8" font-style="italic">San Juanico</text>
            `;
        }

        // Radar Pin Group
        mapContent += `
        <g class="map-pin-group" transform="translate(${bCoords.x}, ${bCoords.y})">
            <!-- Ripple Wave 1 -->
            <circle r="12" fill="none" stroke="${pinColor}" stroke-width="1.5" opacity="0.8">
                <animate attributeName="r" values="4;18" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <!-- Ripple Wave 2 -->
            <circle r="18" fill="none" stroke="${pinColor}" stroke-width="1" opacity="0.4">
                <animate attributeName="r" values="8;26" dur="2s" begin="0.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <!-- Glow dot center -->
            <circle r="5.5" fill="${pinColor}" stroke="#ffffff" stroke-width="1.5" style="filter: drop-shadow(0 0 3px ${pinColor});" />
            
            <!-- Dynamic flag frame with active Barangay name -->
            <rect x="8" y="-12" width="75" height="15" fill="rgba(11, 19, 41, 0.85)" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" rx="2" />
            <text x="12" y="-2" fill="#ffffff" font-size="6.5" font-family="var(--font-heading)" font-weight="700">${bData.name}</text>
        </g>
        `;

        gisMapSvg.innerHTML = mapContent;
    }

    // Initialize application logic
    init();
});

/* ============================================================
   HOUSE PHOTO ANALYZER — Global functions (outside DOMContentLoaded
   so they are accessible from inline HTML onclick / onchange attributes)
   ============================================================ */

/** Workforce Plan trade composition helper */
function updateWorkforcePlanText(crewSize) {
    const el = document.getElementById('crewCompositionText');
    if (!el) return;
    const plans = {
        2: '1 Lead Foreman / Mason, 1 Skilled Carpenter',
        4: '1 Site Supervisor, 2 Skilled Masons, 1 General Laborer',
        6: '1 Site Supervisor, 2 Masons, 1 Carpenter, 2 General Laborers',
        8: '1 Site Supervisor, 3 Masons, 2 Carpenters, 2 General Laborers',
        10: '1 Site Supervisor, 3 Masons, 2 Carpenters, 3 General Laborers, 1 Electrician/Plumber',
        12: '1 Project Foreman, 4 Masons, 3 Carpenters, 3 General Laborers, 1 Master Electrician, 1 Master Plumber'
    };
    el.innerText = plans[crewSize] || `${Math.ceil(crewSize / 3)} Masons, ${Math.ceil(crewSize / 4)} Carpenters, ${Math.floor(crewSize / 2)} Laborers`;
}

/** Handle drag-drop onto the upload zone */
function handlePhotoDrop(event) {
    event.preventDefault();
    const uploadCard = document.getElementById('photoUploadCard');
    if (uploadCard) uploadCard.style.borderColor = 'rgba(14,165,233,0.35)';
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handlePhotoUpload(file);
}

/**
 * Detect stated area (e.g. "60 sqm", "60 square meters", "60m2", "60 sq.m", "60 m²")
 * from text extracted from image filename, OCR, or user input.
 */
function parseStatedAreaFromText(str) {
    if (!str || typeof str !== 'string') return null;
    const clean = str.replace(/[\r\n\t_]/g, ' ');

    // 1. Matches patterns like "60 sqm", "60 sq.m", "60 sq m", "60m2", "60m²", "60 square meters", "60 sq meters"
    const p1 = /(?:floor\s*area|total\s*area|area|size)?\s*[:=\-]?\s*(\d{1,4}(?:\.\d+)?)\s*(?:sqm|sq\.?\s*m\.?|m2|m²|square\s*meters?|square\s*m|sq\s*meters?)/i;
    let m = clean.match(p1);
    if (m && m[1]) {
        const val = parseFloat(m[1]);
        if (val >= 20 && val <= 800) return val;
    }

    // 2. Matches "area: 60", "area 60"
    const p2 = /(?:area|floor\s*area|house\s*size|size)\s*[:=\-]?\s*(\d{2,4}(?:\.\d+)?)(?:\s*(?:m|sqm|sq|m2|m²))?/i;
    m = clean.match(p2);
    if (m && m[1]) {
        const val = parseFloat(m[1]);
        if (val >= 20 && val <= 800) return val;
    }

    // 3. Standalone area badge like "60-sqm", "60 sqm", "60m"
    const p3 = /(?:^|[^\d])(\d{2,3})\s*(?:sqm|m2|m²)(?:[^\d]|$)/i;
    m = clean.match(p3);
    if (m && m[1]) {
        const val = parseFloat(m[1]);
        if (val >= 20 && val <= 800) return val;
    }

    // 4. Dimensions pattern like "6x10", "6 x 10 m", "10x6" => 60 m²
    const p4 = /(?:^|[^\d])(\d{1,2}(?:\.\d+)?)\s*[xX×*]\s*(\d{1,2}(?:\.\d+)?)\s*(?:m|meters?)?(?:[^\d]|$)/i;
    m = clean.match(p4);
    if (m && m[1] && m[2]) {
        const calc = Math.round(parseFloat(m[1]) * parseFloat(m[2]));
        if (calc >= 20 && calc <= 600) return calc;
    }

    return null;
}

/**
 * Detect stated storeys / floor level specifications or stairs from text (filename or OCR)
 */
function detectFloorsFromText(str) {
    if (!str || typeof str !== 'string') return null;
    const clean = str.replace(/[\r\n\t_]/g, ' ').toLowerCase();

    // 3-storey patterns
    const p3 = /(?:3(?:rd)?[\s\-_]*(?:floor|flr|storey|story|level|tier)|three[\s\-_]*(?:storey|story|floors?|levels?)|tri[\s\-_]*level)/i;
    if (p3.test(clean)) {
        return { floors: 3, reason: 'Stated 3rd floor / 3-storey specification in text or file' };
    }

    // 2-storey or stairs patterns
    const p2 = /(?:2(?:nd)?[\s\-_]*(?:floor|flr|storey|story|level|tier)|two[\s\-_]*(?:storey|story|floors?|levels?)|second[\s\-_]*floor|upper[\s\-_]*floor|stairs?|staircase|stairwell|upstairs|loft|duplex|bi[\s\-_]*level)/i;
    if (p2.test(clean)) {
        return { floors: 2, reason: 'Stated 2nd floor / stairs specification in text or file' };
    }

    return null;
}

/**
 * Visual computer vision facade analysis:
 * Detects vertically stacked windows (a window above a ground-floor window -> 2nd floor,
 * 3 vertical tiers of windows -> 3rd floor) and ascending stairs patterns from image canvas.
 */
function detectVisualFloorsFromCanvas(imgElement) {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const W = 220, H = 220;
        canvas.width = W;
        canvas.height = H;
        ctx.drawImage(imgElement, 0, 0, W, H);
        const imgData = ctx.getImageData(0, 0, W, H);
        const data = imgData.data;

        // Calculate horizontal edge contrast profile along vertical axis (y = 0 to H)
        // Window frames, sills, and glazing produce concentrated horizontal contrast spikes
        const rowContrast = new Float32Array(H);
        for (let y = 1; y < H - 1; y++) {
            let rowDiff = 0;
            for (let x = 12; x < W - 12; x++) {
                const idx = (y * W + x) * 4;
                const above = ((y - 1) * W + x) * 4;
                const below = ((y + 1) * W + x) * 4;
                const lum = data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
                const lumAbove = data[above] * 0.299 + data[above + 1] * 0.587 + data[above + 2] * 0.114;
                const lumBelow = data[below] * 0.299 + data[below + 1] * 0.587 + data[below + 2] * 0.114;
                rowDiff += Math.abs(lum - lumAbove) + Math.abs(lum - lumBelow);
            }
            rowContrast[y] = rowDiff / (W - 24);
        }

        // Measure contrast peaks in 3 distinct vertical facade elevation zones:
        // Top tier (3rd Floor elevation window zone): y: 14% to 35%
        // Middle tier (2nd Floor elevation window zone): y: 35% to 60%
        // Bottom tier (Ground floor doors/windows zone): y: 60% to 86%
        let z1Peak = 0, z2Peak = 0, z3Peak = 0;
        for (let y = Math.round(H * 0.14); y < Math.round(H * 0.35); y++) {
            if (rowContrast[y] > z1Peak) z1Peak = rowContrast[y];
        }
        for (let y = Math.round(H * 0.35); y < Math.round(H * 0.60); y++) {
            if (rowContrast[y] > z2Peak) z2Peak = rowContrast[y];
        }
        for (let y = Math.round(H * 0.60); y < Math.round(H * 0.86); y++) {
            if (rowContrast[y] > z3Peak) z3Peak = rowContrast[y];
        }

        const avgPeak = (z1Peak + z2Peak + z3Peak) / 3;
        const threshold = avgPeak * 0.68;

        const hasBottomWindows = z3Peak > threshold;
        const hasMiddleWindows = z2Peak > threshold;
        const hasTopWindows = z1Peak > threshold;

        const ratio = (imgElement.naturalWidth || 1) / Math.max(imgElement.naturalHeight || 1, 1);

        // 3 Tiers of vertically stacked windows
        if (hasBottomWindows && hasMiddleWindows && hasTopWindows && (ratio < 1.15)) {
            return {
                floors: 3,
                reason: 'Vertically stacked 3-tier window elevations detected (Ground + 2nd + 3rd Floor)'
            };
        }

        // 2 Tiers of vertically stacked windows (Upper window directly above ground window) or stairs
        if (hasBottomWindows && hasMiddleWindows && (ratio < 1.45)) {
            return {
                floors: 2,
                reason: 'Vertically stacked window tier detected (Upper windows directly above ground floor windows)'
            };
        }

        // Fallback to aspect ratio calibration
        if (ratio < 0.65) {
            return { floors: 3, reason: 'Vertical elevation aspect ratio indicates 3-storey building' };
        } else if (ratio < 0.88) {
            return { floors: 2, reason: 'Vertical facade height indicates 2-storey house' };
        }

        return { floors: 1, reason: 'Single-storey bungalow facade profile' };
    } catch (e) {
        console.warn('Visual facade analysis notice:', e);
        return { floors: 1, reason: 'Default single-storey profile' };
    }
}

/**
 * Optical character recognition (OCR) scan on uploaded image canvas
 * Runs Tesseract with a 2-second timeout race to prevent UI freeze
 */
async function attemptImageOcrScan(imgElement) {
    if (!window.Tesseract || !window.Tesseract.recognize) return null;
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxDim = 1100;
        let w = imgElement.naturalWidth || imgElement.width || 800;
        let h = imgElement.naturalHeight || imgElement.height || 600;
        if (w > maxDim || h > maxDim) {
            const sc = maxDim / Math.max(w, h);
            w = Math.round(w * sc);
            h = Math.round(h * sc);
        }
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(imgElement, 0, 0, w, h);

        const ocrPromise = window.Tesseract.recognize(canvas, 'eng');
        const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(null), 2200));
        const res = await Promise.race([ocrPromise, timeoutPromise]);
        if (res && res.data && res.data.text) {
            const area = parseStatedAreaFromText(res.data.text);
            return { area: area, rawText: res.data.text };
        }
    } catch (e) {
        console.warn('OCR processing notice:', e);
    }
    return null;
}

/** Main entry — called when user selects or drops a house photo */
async function handlePhotoUpload(file) {
    if (!file) return;
    const photoInput = document.getElementById('housePhotoInput');
    if (photoInput) photoInput.value = '';
    const reader = new FileReader();
    reader.onload = async function (e) {
        const dataUrl = e.target.result;

        // Show analyzing overlay banner on Step 1
        const overlay = document.getElementById('analyzingOverlay');
        const uploadCard = document.getElementById('photoUploadCard');
        const mainTxt = document.getElementById('analyzingMainText');
        const subTxt = document.getElementById('analyzingSubText');
        if (overlay) overlay.style.display = 'block';
        if (uploadCard) uploadCard.style.opacity = '0.35';

        // Check manual input hint first
        const hintInput = document.getElementById('photoAreaHint');
        let statedArea = null;
        let detectionSource = 'visual geometry estimate';

        if (hintInput && hintInput.value.trim()) {
            const manualVal = parseFloat(hintInput.value.trim());
            if (manualVal >= 20 && manualVal <= 800) {
                statedArea = manualVal;
                detectionSource = 'manual user specification';
            }
        }

        // Check filename second (e.g. house_60sqm.jpg, 60m2.png)
        if (!statedArea && file.name) {
            const fnArea = parseStatedAreaFromText(file.name);
            if (fnArea) {
                statedArea = fnArea;
                detectionSource = `file name ("${file.name}")`;
            }
        }

        const img = new Image();
        img.onload = async function () {
            const w = img.naturalWidth;
            const h = img.naturalHeight;

            let ocrRawText = '';
            // If not found in filename or hint, perform quick OCR pass on the image
            if (!statedArea) {
                if (mainTxt) mainTxt.innerText = 'AI Scanning Image for Stated Area & Text...';
                if (subTxt) subTxt.innerText = 'Detecting embedded labels (e.g. 60 sqm) and structural elevations...';
                const ocrResult = await attemptImageOcrScan(img);
                if (ocrResult) {
                    statedArea = ocrResult.area;
                    ocrRawText = ocrResult.rawText || '';
                    if (ocrResult.area) {
                        detectionSource = `image text / blueprint specification (OCR: ${ocrResult.area} m²)`;
                    }
                }
            }

            // Detect floor levels from: filename -> OCR text -> Canvas vision (stacked window tiers / stairs)
            let floorDetection = detectFloorsFromText(file.name);
            if (!floorDetection && ocrRawText) {
                floorDetection = detectFloorsFromText(ocrRawText);
            }
            if (!floorDetection) {
                floorDetection = detectVisualFloorsFromCanvas(img);
            }

            const detectedFloors = floorDetection ? floorDetection.floors : 1;
            const floorsReason = floorDetection ? floorDetection.reason : 'Standard bungalow facade';

            if (mainTxt) {
                const areaLabel = statedArea ? `${Math.round(statedArea)} m²` : 'Calculated Area';
                const floorLabel = detectedFloors === 3 ? '3-Storey (3 Window Tiers)' : detectedFloors === 2 ? '2-Storey (Upper Windows / Stairs)' : '1-Storey Bungalow';
                mainTxt.innerHTML = `<span style="color:#38bdf8;">✨ AI Detected: ${areaLabel} • ${floorLabel}</span>`;
            }
            if (subTxt) {
                subTxt.innerHTML = `Identified: <strong>${floorsReason}</strong>. Adopting multi-level layout, staircase blueprint, and Davao building code compliance...`;
            }

            // Simulate high-tech AI scan then go DIRECTLY to Step 2 Estimation!
            setTimeout(() => {
                if (overlay) overlay.style.display = 'none';
                if (uploadCard) uploadCard.style.opacity = '1';

                // Run AI photo analysis and register custom house model
                analyzePhotoAndSetHouse(file, dataUrl, w, h, statedArea, detectionSource, detectedFloors, floorsReason);

                // GO DIRECTLY TO ESTIMATION (STEP 2)
                if (window.transitionWizard) {
                    window.transitionWizard(2);
                }
            }, 850);
        };
        img.src = dataUrl;
    };
    reader.readAsDataURL(file);
}

/**
 * "AI" photo analyzer:
 * Reads stated area and detected floor count (or calculates from image geometry/aspect ratio)
 * to estimate floor area, quality grade, and floor levels.
 */
function analyzePhotoAndSetHouse(file, dataUrl, imgW, imgH, statedArea = null, detectionSource = '', detectedFloors = 1, floorsReason = '') {
    const ratio = imgW / Math.max(imgH, 1);
    const seed = (imgW * imgH) % 1000;

    let estArea = statedArea;
    if (!estArea) {
        estArea = Math.round(45 + (ratio * 40) + (seed * 0.12));
        estArea = Math.min(Math.max(estArea, 40), 280);
    }

    let qualityVal = 'standard';
    const totalPx = imgW * imgH;
    if (totalPx > 3500000) qualityVal = 'luxury';
    else if (totalPx > 1400000) qualityVal = 'premium';

    const floors = parseInt(detectedFloors) || 1;

    createCustomPhotoHouse(dataUrl, estArea, floors, qualityVal, 'gable');

    // Update banner in Step 2 with the adopted area & storeys
    const adoptedVal = document.getElementById('aiAdoptedAreaVal');
    const adoptedNote = document.getElementById('aiAdoptedAreaNote');
    if (adoptedVal) adoptedVal.innerText = `${Math.round(estArea)} m² (${floors} ${floors > 1 ? 'Storeys' : 'Storey'})`;
    if (adoptedNote) {
        const floorDesc = floors === 3 ? '3-Storey structure' : floors === 2 ? '2-Storey structure' : 'Single-storey bungalow';
        adoptedNote.innerHTML = `✨ Adopted <strong>${Math.round(estArea)} m²</strong> &amp; <strong>${floorDesc}</strong> (${floorsReason || detectionSource}). Blueprint staircase, materials count, and workforce timeline have adopted it directly.`;
    }
}

/**
 * Creates or updates the dynamic custom photo house model in state
 */
function createCustomPhotoHouse(dataUrl, area, floors, quality, roofType) {
    const s = window.systemState;
    if (!s) return;

    floors = parseInt(floors) || 1;
    area = parseFloat(area) || 80;
    quality = quality || 'standard';
    roofType = roofType || 'gable';

    const bedrooms = area < 55 ? 1 : area < 90 ? 2 : area < 150 ? 3 : 4;
    const baths = area < 70 ? 1 : area < 130 ? 2 : 3;
    const scale = (area * floors) / 80;

    const foundationDesc = floors > 1
        ? 'Reinforced Concrete Ground Piers & Continuous Footings'
        : 'Reinforced Concrete Slab-on-Grade & Strip Footing';
    const wallDesc = quality === 'luxury'
        ? 'High-Strength Concrete CHB with Thermal Wall Insulation'
        : quality === 'premium'
            ? 'Load-Bearing Concrete CHB with Tie Columns'
            : 'Standard Reinforced CHB Concrete Masonry';
    const roofDesc = roofType === 'hip'
        ? 'Engineered Hip-Profile Heavy Steel Trusses & GI Sheets'
        : roofType === 'flat'
            ? 'Reinforced Concrete Flat Roof Deck with Waterproofing'
            : 'Storm-Grade Gable Steel Framing & Pre-painted GI Panels';

    const mult = {
        cement: Math.round(180 * scale),
        steel: Math.round(1200 * scale),
        bricks: Math.round(2400 * scale),
        sand: Math.round(22 * scale),
        lumber: Math.round(750 * scale),
        roof: Math.round(area * 1.15),
        paint: Math.round(80 * scale),
        fixtures: bedrooms + baths + 2
    };

    const baseDays = Math.round(55 + (area * 0.45) * floors);

    // Keep existing image if not provided
    const existingImg = s.houses['custom_photo'] ? s.houses['custom_photo'].img : '';
    const finalImg = dataUrl || existingImg;

    s.houses['custom_photo'] = {
        id: 'custom_photo',
        name: 'AI Analyzed House (Photo Upload)',
        price: 0,
        area: area,
        beds: bedrooms,
        baths: baths,
        floors: floors,
        roofType: roofType,
        areaTier: quality,
        img: finalImg,
        blueprint: '',
        safetyScore: '97%',
        foundation: foundationDesc,
        walls: wallDesc,
        roof: roofDesc,
        adaptations: [
            '✓ Site-specific soil load foundation calibration',
            '✓ PHIVOLCS-aligned seismic tie-wire column reinforcing',
            '✓ High-wind load storm clips & aerodynamic bracing'
        ],
        baseDays: baseDays,
        multipliers: mult,
        specialty: floors > 1 ? 40000 : 0
    };

    s.activeHouse = 'custom_photo';

    // Synchronize form inputs in Step 2 if they exist
    const sArea = document.getElementById('paAreaSlider');
    const iArea = document.getElementById('paAreaInput');
    const sQual = document.getElementById('paQualitySelect');
    const sFlr = document.getElementById('paFloorsSelect');
    const sRoof = document.getElementById('paRoofSelect');

    if (sArea) sArea.value = area;
    if (iArea) iArea.value = area;
    if (sQual) sQual.value = quality;
    if (sFlr) sFlr.value = floors;
    if (sRoof) sRoof.value = roofType;

    const adoptedVal = document.getElementById('aiAdoptedAreaVal');
    const adoptedNote = document.getElementById('aiAdoptedAreaNote');
    if (adoptedVal) adoptedVal.innerText = `${Math.round(area)} m² (${floors} ${floors > 1 ? 'Storeys' : 'Storey'})`;
    if (adoptedNote) {
        const floorDesc = floors === 3 ? '3-Storey structure' : floors === 2 ? '2-Storey structure' : 'Single-storey bungalow';
        adoptedNote.innerHTML = `Floor area calibrated to ${Math.round(area)} square meters &amp; ${floorDesc} (${bedrooms} Bedrooms, ${baths} Bathroom${baths > 1 ? 's' : ''}). Blueprint staircase, structural piers, and materials synchronized.`;
    }
}

/** Parameter change helpers from Step 2 */
function updatePhotoArea(val) {
    const area = parseFloat(val) || 80;
    const sArea = document.getElementById('paAreaSlider');
    const iArea = document.getElementById('paAreaInput');
    if (sArea) sArea.value = area;
    if (iArea) iArea.value = area;

    const s = window.systemState;
    if (s && s.activeHouse === 'custom_photo' && s.houses['custom_photo']) {
        const cur = s.houses['custom_photo'];
        createCustomPhotoHouse(cur.img, area, cur.floors, cur.areaTier, cur.roofType);
        if (window.updateStep2Estimate) window.updateStep2Estimate();
    }
}

function updatePhotoQuality(val) {
    const s = window.systemState;
    if (s && s.activeHouse === 'custom_photo' && s.houses['custom_photo']) {
        const cur = s.houses['custom_photo'];
        createCustomPhotoHouse(cur.img, cur.area, cur.floors, val, cur.roofType);
        if (window.updateStep2Estimate) window.updateStep2Estimate();
    }
}

function updatePhotoFloors(val) {
    const s = window.systemState;
    if (s && s.activeHouse === 'custom_photo' && s.houses['custom_photo']) {
        const cur = s.houses['custom_photo'];
        createCustomPhotoHouse(cur.img, cur.area, parseInt(val) || 1, cur.areaTier, cur.roofType);
        if (window.updateStep2Estimate) window.updateStep2Estimate();
    }
}

function updatePhotoRoof(val) {
    const s = window.systemState;
    if (s && s.activeHouse === 'custom_photo' && s.houses['custom_photo']) {
        const cur = s.houses['custom_photo'];
        createCustomPhotoHouse(cur.img, cur.area, cur.floors, cur.areaTier, val);
        if (window.updateStep2Estimate) window.updateStep2Estimate();
    }
}

/**
 * Architectural Floor Plan Blueprint Generator — Technical CAD drafting style.
 * High-resolution vector canvas (880 x 560), double-line walls, dimension markers, door arcs, furniture.
 * Professional architectural floor plan standard.
 */
function drawPhotoBlueprint(area, floors, targetId = 'step2BlueprintSvg') {
    const svg = (typeof targetId === 'string' ? document.getElementById(targetId) : targetId) || document.getElementById('step2BlueprintSvg') || document.getElementById('photoBlueprint');
    if (!svg) return;

    // Technical Blueprint Canvas: High-Resolution 880x560
    const W = 880, H = 560;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.style.height = '100%';
    svg.style.width = '100%';
    svg.style.display = 'block';

    const bedrooms = area < 55 ? 1 : area < 90 ? 2 : area < 150 ? 3 : 4;

    // House real-world dimensions in meters
    const baseDims = { 1: [5.5, 7.5], 2: [6.5, 9.23], 3: [8.5, 11.0], 4: [10.5, 13.0] };
    const [bW, bD] = baseDims[bedrooms] || [6.5, 9.23];
    const sf = Math.sqrt(area / (bW * bD));
    const houseW = +(bW * sf).toFixed(2);
    const houseD = +(bD * sf).toFixed(2);

    // Layout geometry
    const specW = 210;     // right specifications & legend panel
    const dimOff = 38;     // space for dimension lines
    const titleH = 46;     // title bar height
    const marginL = dimOff + 10;
    const marginT = titleH + dimOff;
    const marginR = specW + 10;
    const marginB = dimOff + 10;
    const bpW = W - marginL - marginR;
    const bpH = H - marginT - marginB;
    const pxM = Math.min(bpW / houseW, bpH / houseD);
    const hW = houseW * pxM;
    const hH = houseD * pxM;
    const hX = marginL + (bpW - hW) / 2;
    const hY = marginT + (bpH - hH) / 2;
    const wt = Math.max(6, pxM * 0.16);   // outer wall px
    const iwt = Math.max(3.5, pxM * 0.10); // inner wall px

    const scaleN = Math.round(100 / pxM * 100);

    // SVG accumulator
    let s = '';

    // ── Background ────────────────────────────────────────────────────
    s += `<rect width="${W}" height="${H}" fill="#f8fafc"/>`;

    // Subtle graph paper grid inside floor plan area
    s += `<defs>
        <pattern id="gpgrid" width="${pxM}" height="${pxM}" patternUnits="userSpaceOnUse" x="${hX}" y="${hY}">
            <rect width="${pxM}" height="${pxM}" fill="none" stroke="#e2e8f0" stroke-width="0.5"/>
        </pattern>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill="#1d4ed8"/>
        </marker>
        <marker id="arrowB" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
            <path d="M0,0 L0,6 L6,3 Z" fill="#1d4ed8"/>
        </marker>
    </defs>`;

    // Grid inside house footprint
    s += `<rect x="${hX + wt}" y="${hY + wt}" width="${hW - wt * 2}" height="${hH - wt * 2}" fill="url(#gpgrid)"/>`;

    // ── Title block ───────────────────────────────────────────────────
    s += `<text x="${marginL}" y="20" fill="#0f172a" font-size="14" font-family="'Outfit',sans-serif" font-weight="900" letter-spacing="0.5">ARCHITECTURAL FLOOR PLAN BLUEPRINT</text>`;
    s += `<text x="${marginL}" y="35" fill="#334155" font-size="11" font-family="'Outfit',monospace" font-weight="700">${houseW.toFixed(2)}m × ${houseD.toFixed(2)}m (${Math.round(area)} SQ.M.) • SCALE 1:${scaleN} • RESIDENTIAL STANDARD</text>`;
    const flrHeading = floors === 3 ? '3-STOREY MULTI-LEVEL' : floors === 2 ? '2-STOREY RESIDENTIAL' : 'BUNGALOW';
    const structHeading = floors > 1 ? 'REINFORCED CHB WITH STAIRWELL ACCESS' : 'REINFORCED CHB MASONRY';
    s += `<text x="${marginL}" y="48" fill="#64748b" font-size="9.5" font-family="'Outfit',monospace">${bedrooms}-BEDROOM ${flrHeading} • ${floors} LEVEL${floors > 1 ? 'S' : ''} • ${structHeading}</text>`;

    // ── Outer wall (solid thick perimeter) ───────────────────────────
    s += `<rect x="${hX}" y="${hY}" width="${hW}" height="${hH}" fill="#1e293b" rx="1"/>`;
    s += `<rect x="${hX + wt}" y="${hY + wt}" width="${hW - wt * 2}" height="${hH - wt * 2}" fill="#f0f7ff" rx="1"/>`;

    // ── Room layouts with double-line inner walls ─────────────────────
    if (bedrooms === 2) {
        // Calibrated 2-Bedroom Layout (Ideal for 60 m²)
        const c1 = hX + hW * 0.40;
        const c2 = hX + hW * 0.65;
        const r1 = hY + hH * 0.50;

        s += dblWall(c1, hY + wt, c1, hY + hH - wt, iwt);
        s += dblWall(c2, hY + wt, c2, hY + hH - wt, iwt);
        s += dblWall(hX + wt, r1, c2, r1, iwt);

        // Room fills
        s += roomRect(hX + wt, hY + wt, c1 - wt, r1 - wt, '#e8f4fd'); // Master Bedroom
        s += roomRect(hX + wt, r1 + iwt / 2, c1 - wt, hY + hH - wt, '#e8f4fd'); // Bedroom 2
        s += roomRect(c1 + iwt / 2, hY + wt, c2 - iwt / 2, r1 - iwt / 2, '#e0f7f7'); // Bathroom
        s += roomRect(c1 + iwt / 2, r1 + iwt / 2, c2 - iwt / 2, hY + hH - wt, '#fff8e1'); // Kitchen
        s += roomRect(c2 + iwt / 2, hY + wt, hX + hW - wt, hY + hH - wt, '#e8f0fe'); // Living/Dining

        // Room labels + dimensions
        const rm = (nm, dim, cx, cy, col) => `
            <text x="${cx}" y="${cy - 6}" text-anchor="middle" fill="${col}" font-size="12" font-family="'Outfit',sans-serif" font-weight="800">${nm}</text>
            <text x="${cx}" y="${cy + 10}" text-anchor="middle" fill="#475569" font-size="10" font-family="'Outfit',monospace" font-weight="600">${dim}</text>`;

        s += rm('MASTER BEDROOM', `${(houseW * 0.40).toFixed(1)} × ${(houseD * 0.50).toFixed(1)}m`, (hX + wt + c1) / 2, (hY + wt + r1) / 2, '#1d4ed8');
        s += rm('BEDROOM 2', `${(houseW * 0.40).toFixed(1)} × ${(houseD * 0.50).toFixed(1)}m`, (hX + wt + c1) / 2, (r1 + hY + hH - wt) / 2, '#1d4ed8');
        s += rm('BATHROOM', `${(houseW * 0.25).toFixed(1)} × ${(houseD * 0.50).toFixed(1)}m`, (c1 + c2) / 2, (hY + wt + r1) / 2, '#0e7490');
        s += rm('KITCHEN', `${(houseW * 0.25).toFixed(1)} × ${(houseD * 0.50).toFixed(1)}m`, (c1 + c2) / 2, (r1 + hY + hH - wt) / 2, '#92400e');
        s += rm('LIVING & DINING', `${(houseW * 0.35).toFixed(1)} × ${houseD.toFixed(1)}m`, (c2 + hX + hW - wt) / 2, (hY + wt + hY + hH - wt) / 2, '#1e3a5f');

        // Doors
        const dr = pxM * 0.78;
        s += archDoor(c1, hY + hH * 0.14, dr, 'right', '#2563eb');
        s += archDoor(c1, hY + hH * 0.64, dr, 'right', '#2563eb');
        s += archDoor(hX + wt, hY + hH * 0.28, pxM * 0.88, 'right', '#2563eb');
        s += archDoor(c2, hY + hH * 0.76, dr, 'right', '#2563eb');

        // Windows (3-line architectural symbol)
        s += archWin(hX + hW * 0.20, hY, pxM * 1.1, 'h');
        s += archWin(hX + hW * 0.20, hY + hH, pxM * 1.1, 'h');
        s += archWin(hX + hW, hY + hH * 0.25, pxM * 0.95, 'v');
        s += archWin(hX + hW, hY + hH * 0.72, pxM * 0.95, 'v');

        // Furniture
        s += fBed(hX + hW * 0.04, hY + hH * 0.07, pxM * 1.45, pxM * 1.15);
        s += fBed(hX + hW * 0.04, hY + hH * 0.57, pxM * 1.45, pxM * 1.15);
        s += fToilet(c1 + hW * 0.03, hY + hH * 0.05, pxM * 0.52, pxM * 0.44);
        s += fSink(c1 + hW * 0.14, hY + hH * 0.05, pxM * 0.4, pxM * 0.36);
        s += fKitchenL(c1 + hW * 0.02, r1 + hH * 0.04, pxM * 0.7, pxM * 0.3);
        s += fSofa(c2 + hW * 0.04, hY + hH * 0.06, pxM * 1.25, pxM * 0.52);
        s += fTable(c2 + hW * 0.175, (hY + wt + hY + hH - wt) / 2, pxM * 0.72);

        // Multi-storey architectural staircase
        if (floors > 1) {
            const stLabel = floors === 3 ? 'UP TO 3RD FLOOR' : 'UP TO 2ND FLOOR';
            s += fStairs(c2 + hW * 0.19, hY + hH * 0.48, pxM * 1.05, pxM * 1.55, stLabel, 8);
        }

        // Sub-dimension lines inside floor plan
        const subDimY = hY - dimOff / 2;
        s += subDim(hX, subDimY, c1, subDimY, `${(houseW * 0.40).toFixed(2)}m`);
        s += subDim(c1, subDimY, c2, subDimY, `${(houseW * 0.25).toFixed(2)}m`);
        s += subDim(c2, subDimY, hX + hW, subDimY, `${(houseW * 0.35).toFixed(2)}m`);

        const subDimX = hX - dimOff / 2;
        s += subDim(hX, hY, hX, r1, `${(houseD * 0.50).toFixed(2)}m`, 'v', subDimX);
        s += subDim(hX, r1, hX, hY + hH, `${(houseD * 0.50).toFixed(2)}m`, 'v', subDimX);

    } else if (bedrooms === 3) {
        const c1 = hX + hW * 0.37;
        const c2 = hX + hW * 0.62;
        const r1 = hY + hH * 0.37;
        const r2 = hY + hH * 0.67;

        s += dblWall(c1, hY + wt, c1, hY + hH - wt, iwt);
        s += dblWall(c2, hY + wt, c2, hY + hH - wt, iwt);
        s += dblWall(hX + wt, r1, c2, r1, iwt);
        s += dblWall(hX + wt, r2, c2, r2, iwt);

        s += roomRect(hX + wt, hY + wt, c1, r1, '#e8f4fd');
        s += roomRect(hX + wt, r1 + iwt / 2, c1, r2, '#e8f4fd');
        s += roomRect(hX + wt, r2 + iwt / 2, c1, hY + hH - wt, '#e8f4fd');
        s += roomRect(c1 + iwt / 2, hY + wt, c2 - iwt / 2, r2, '#e0f7f7');
        s += roomRect(c1 + iwt / 2, r2 + iwt / 2, c2 - iwt / 2, hY + hH - wt, '#fff8e1');
        s += roomRect(c2 + iwt / 2, hY + wt, hX + hW - wt, hY + hH - wt, '#e8f0fe');

        const rm3 = (nm, dim, cx, cy, col) => `
            <text x="${cx}" y="${cy - 5}" text-anchor="middle" fill="${col}" font-size="11" font-family="'Outfit',sans-serif" font-weight="800">${nm}</text>
            <text x="${cx}" y="${cy + 8}" text-anchor="middle" fill="#475569" font-size="9" font-family="'Outfit',monospace">${dim}</text>`;
        s += rm3('BEDROOM 1', `${(houseW * .37).toFixed(1)}×${(houseD * .37).toFixed(1)}m`, (hX + wt + c1) / 2, (hY + wt + r1) / 2, '#1d4ed8');
        s += rm3('BEDROOM 2', `${(houseW * .37).toFixed(1)}×${(houseD * .30).toFixed(1)}m`, (hX + wt + c1) / 2, (r1 + r2) / 2, '#1d4ed8');
        s += rm3('BEDROOM 3', `${(houseW * .37).toFixed(1)}×${(houseD * .33).toFixed(1)}m`, (hX + wt + c1) / 2, (r2 + hY + hH - wt) / 2, '#1d4ed8');
        s += rm3('BATHROOM', `${(houseW * .25).toFixed(1)}×${(houseD * .67).toFixed(1)}m`, (c1 + c2) / 2, (hY + wt + r2) / 2, '#0e7490');
        s += rm3('KITCHEN', `${(houseW * .25).toFixed(1)}×${(houseD * .33).toFixed(1)}m`, (c1 + c2) / 2, (r2 + hY + hH - wt) / 2, '#92400e');
        s += rm3('LIVING / DINING', `${(houseW * .38).toFixed(1)}×${houseD.toFixed(1)}m`, (c2 + hX + hW - wt) / 2, (hY + wt + hY + hH - wt) / 2, '#1e3a5f');

        s += archDoor(c1, hY + hH * 0.10, pxM * .75, 'right', '#2563eb');
        s += archDoor(c1, hY + hH * 0.44, pxM * .75, 'right', '#2563eb');
        s += archDoor(c1, hY + hH * 0.72, pxM * .75, 'right', '#2563eb');
        s += archDoor(c2, hY + hH * 0.32, pxM * .88, 'right', '#2563eb');
        s += archDoor(hX + wt, hY + hH * 0.22, pxM * .88, 'right', '#2563eb');

        s += archWin(hX + hW * 0.185, hY, pxM * 1.0, 'h');
        s += archWin(hX + hW * 0.185, hY + hH, pxM * 0.95, 'h');
        s += archWin(hX + hW, hY + hH * 0.25, pxM * 1.05, 'v');
        s += archWin(hX + hW, hY + hH * 0.70, pxM * 0.85, 'v');

        s += fBed(hX + hW * 0.04, hY + hH * 0.04, pxM * 1.4, pxM * 1.1);
        s += fBed(hX + hW * 0.04, hY + hH * 0.40, pxM * 1.3, pxM * 1.05);
        s += fBed(hX + hW * 0.04, hY + hH * 0.72, pxM * 1.25, pxM * 1.0);
        s += fToilet(c1 + hW * 0.02, hY + hH * 0.04, pxM * 0.52, pxM * 0.44);
        s += fKitchenL(c1 + hW * 0.02, r2 + hH * 0.03, pxM * 0.7, pxM * 0.3);
        s += fSofa(c2 + hW * 0.03, hY + hH * 0.05, pxM * 1.25, pxM * 0.5);
        s += fTable(c2 + hW * 0.19, (hY + wt + hY + hH - wt) / 2, pxM * 0.7);

        if (floors > 1) {
            const stLabel = floors === 3 ? 'UP TO 3RD FLOOR' : 'UP TO 2ND FLOOR';
            s += fStairs(c2 + hW * 0.19, hY + hH * 0.65, pxM * 0.95, pxM * 1.45, stLabel, 8);
        }

        const subDimY = hY - dimOff / 2, subDimX = hX - dimOff / 2;
        s += subDim(hX, subDimY, c1, subDimY, `${(houseW * .37).toFixed(2)}m`);
        s += subDim(c1, subDimY, c2, subDimY, `${(houseW * .25).toFixed(2)}m`);
        s += subDim(c2, subDimY, hX + hW, subDimY, `${(houseW * .38).toFixed(2)}m`);
        s += subDim(hX, hY, hX, r1, `${(houseD * .37).toFixed(2)}m`, 'v', subDimX);
        s += subDim(hX, r1, hX, r2, `${(houseD * .30).toFixed(2)}m`, 'v', subDimX);
        s += subDim(hX, r2, hX, hY + hH, `${(houseD * .33).toFixed(2)}m`, 'v', subDimX);

    } else if (bedrooms === 4) {
        const c1 = hX + hW * 0.34;
        const c2 = hX + hW * 0.58;
        const r1 = hY + hH * 0.27;
        const r2 = hY + hH * 0.52;
        const r3 = hY + hH * 0.76;

        s += dblWall(c1, hY + wt, c1, hY + hH - wt, iwt);
        s += dblWall(c2, hY + wt, c2, hY + hH - wt, iwt);
        s += dblWall(hX + wt, r1, c1, r1, iwt);
        s += dblWall(hX + wt, r2, c1, r2, iwt);
        s += dblWall(hX + wt, r3, c2, r3, iwt);
        s += dblWall(c1, r3, c2, r3, iwt);

        s += roomRect(hX + wt, hY + wt, c1, r1, '#e8f4fd');
        s += roomRect(hX + wt, r1 + iwt / 2, c1, r2, '#e8f4fd');
        s += roomRect(hX + wt, r2 + iwt / 2, c1, r3, '#e8f4fd');
        s += roomRect(hX + wt, r3 + iwt / 2, c1, hY + hH - wt, '#e8f4fd');
        s += roomRect(c1 + iwt / 2, hY + wt, c2 - iwt / 2, r3, '#e0f7f7');
        s += roomRect(c1 + iwt / 2, r3 + iwt / 2, c2 - iwt / 2, hY + hH - wt, '#dcfce7');
        s += roomRect(c2 + iwt / 2, hY + wt, hX + hW - wt, r3, '#e8f0fe');
        s += roomRect(c2 + iwt / 2, r3 + iwt / 2, hX + hW - wt, hY + hH - wt, '#fff8e1');

        const rm4 = (nm, dim, cx, cy, col) => `
            <text x="${cx}" y="${cy - 4}" text-anchor="middle" fill="${col}" font-size="10" font-family="'Outfit',sans-serif" font-weight="800">${nm}</text>
            <text x="${cx}" y="${cy + 7}" text-anchor="middle" fill="#475569" font-size="8.5" font-family="'Outfit',monospace">${dim}</text>`;
        s += rm4('BEDROOM 1', `${(houseW * .34).toFixed(1)}×${(houseD * .27).toFixed(1)}m`, (hX + wt + c1) / 2, (hY + wt + r1) / 2, '#1d4ed8');
        s += rm4('BEDROOM 2', `${(houseW * .34).toFixed(1)}×${(houseD * .25).toFixed(1)}m`, (hX + wt + c1) / 2, (r1 + r2) / 2, '#1d4ed8');
        s += rm4('BEDROOM 3', `${(houseW * .34).toFixed(1)}×${(houseD * .24).toFixed(1)}m`, (hX + wt + c1) / 2, (r2 + r3) / 2, '#1d4ed8');
        s += rm4('BEDROOM 4', `${(houseW * .34).toFixed(1)}×${(houseD * .24).toFixed(1)}m`, (hX + wt + c1) / 2, (r3 + hY + hH - wt) / 2, '#1d4ed8');
        s += rm4('BATHROOM', `${(houseW * .24).toFixed(1)}×${(houseD * .76).toFixed(1)}m`, (c1 + c2) / 2, (hY + wt + r3) / 2, '#0e7490');
        s += rm4('UTILITY', `${(houseW * .24).toFixed(1)}×${(houseD * .24).toFixed(1)}m`, (c1 + c2) / 2, (r3 + hY + hH - wt) / 2, '#065f46');
        s += rm4('LIVING / DINING', `${(houseW * .42).toFixed(1)}×${(houseD * .76).toFixed(1)}m`, (c2 + hX + hW - wt) / 2, (hY + wt + r3) / 2, '#1e3a5f');
        s += rm4('KITCHEN', `${(houseW * .42).toFixed(1)}×${(houseD * .24).toFixed(1)}m`, (c2 + hX + hW - wt) / 2, (r3 + hY + hH - wt) / 2, '#92400e');

        s += archDoor(c1, hY + hH * .08, pxM * .70, 'right', '#2563eb');
        s += archDoor(c1, hY + hH * .33, pxM * .70, 'right', '#2563eb');
        s += archDoor(c1, hY + hH * .56, pxM * .70, 'right', '#2563eb');
        s += archDoor(c1, hY + hH * .79, pxM * .70, 'right', '#2563eb');
        s += archDoor(c2, hY + hH * .28, pxM * .88, 'right', '#2563eb');
        s += archDoor(hX + wt, hY + hH * .18, pxM * .85, 'right', '#2563eb');

        s += archWin(hX + hW * .17, hY, pxM * .92, 'h');
        s += archWin(hX + hW * .17, hY + hH, pxM * .92, 'h');
        s += archWin(hX + hW, hY + hH * .22, pxM * 1.05, 'v');
        s += archWin(hX + hW, hY + hH * .62, pxM * .82, 'v');

        s += fBed(hX + hW * .04, hY + hH * .02, pxM * 1.35, pxM * 1.0);
        s += fBed(hX + hW * .04, hY + hH * .28, pxM * 1.25, pxM * 0.95);
        s += fBed(hX + hW * .04, hY + hH * .54, pxM * 1.2, pxM * 0.92);
        s += fBed(hX + hW * .04, hY + hH * .79, pxM * 1.15, pxM * 0.9);
        s += fToilet(c1 + hW * .02, hY + hH * .04, pxM * .52, pxM * .42);
        s += fSofa(c2 + hW * .03, hY + hH * .04, pxM * 1.35, pxM * .5);
        s += fTable(c2 + hW * .21, (hY + wt + r3) / 2, pxM * .75);
        s += fKitchenL(c2 + hW * .03, r3 + hH * .04, pxM * .85, pxM * .3);

        if (floors > 1) {
            const stLabel = floors === 3 ? 'UP TO 3RD FLOOR' : 'UP TO 2ND FLOOR';
            s += fStairs(c2 + hW * 0.22, hY + hH * 0.50, pxM * 0.95, pxM * 1.45, stLabel, 8);
        }

        const sdY = hY - dimOff / 2, sdX = hX - dimOff / 2;
        s += subDim(hX, sdY, c1, sdY, `${(houseW * .34).toFixed(2)}m`);
        s += subDim(c1, sdY, c2, sdY, `${(houseW * .24).toFixed(2)}m`);
        s += subDim(c2, sdY, hX + hW, sdY, `${(houseW * .42).toFixed(2)}m`);
        s += subDim(hX, hY, hX, r1, `${(houseD * .27).toFixed(2)}m`, 'v', sdX);
        s += subDim(hX, r1, hX, r2, `${(houseD * .25).toFixed(2)}m`, 'v', sdX);
        s += subDim(hX, r2, hX, r3, `${(houseD * .24).toFixed(2)}m`, 'v', sdX);
        s += subDim(hX, r3, hX, hY + hH, `${(houseD * .24).toFixed(2)}m`, 'v', sdX);

    } else {
        // 1-Bedroom Layout
        const c1 = hX + hW * 0.50;
        const r1 = hY + hH * 0.55;
        s += dblWall(c1, hY + wt, c1, hY + hH - wt, iwt);
        s += dblWall(c1 + iwt / 2, r1, hX + hW - wt, r1, iwt);
        s += roomRect(hX + wt, hY + wt, c1, hY + hH - wt, '#e8f4fd');
        s += roomRect(c1 + iwt / 2, hY + wt, hX + hW - wt, r1 - iwt / 2, '#e8f0fe');
        s += roomRect(c1 + iwt / 2, r1 + iwt / 2, hX + hW - wt, hY + hH - wt, '#fff8e1');

        s += `<text x="${(hX + wt + c1) / 2}" y="${(hY + wt + hY + hH - wt) / 2 - 5}" text-anchor="middle" fill="#1d4ed8" font-size="12" font-family="'Outfit',sans-serif" font-weight="800">BEDROOM</text>`;
        s += `<text x="${(hX + wt + c1) / 2}" y="${(hY + wt + hY + hH - wt) / 2 + 10}" text-anchor="middle" fill="#475569" font-size="10" font-family="'Outfit',monospace">${(houseW * .50).toFixed(1)}×${houseD.toFixed(1)}m</text>`;
        s += `<text x="${(c1 + hX + hW - wt) / 2}" y="${(hY + wt + r1) / 2}" text-anchor="middle" fill="#1e3a5f" font-size="12" font-family="'Outfit',sans-serif" font-weight="800">LIVING AREA</text>`;
        s += `<text x="${(c1 + hX + hW - wt) / 2}" y="${(r1 + hY + hH - wt) / 2}" text-anchor="middle" fill="#92400e" font-size="12" font-family="'Outfit',sans-serif" font-weight="800">KITCHEN/BATH</text>`;

        s += archDoor(c1, hY + hH * 0.25, pxM * .82, 'right', '#2563eb');
        s += archDoor(hX + wt, hY + hH * 0.25, pxM * .88, 'right', '#2563eb');
        s += archWin(hX + hW * 0.25, hY, pxM * 1.1, 'h');
        s += archWin(hX + hW, hY + hH * 0.25, pxM * 0.95, 'v');
        s += fBed(hX + hW * 0.06, hY + hH * 0.12, pxM * 1.45, pxM * 1.15);
        s += fSofa(c1 + hW * 0.04, hY + hH * 0.06, pxM * 1.3, pxM * 0.5);
        s += fTable(c1 + hW * 0.27, hY + hH * 0.35, pxM * 0.65);

        if (floors > 1) {
            const stLabel = floors === 3 ? 'UP TO 3RD FLOOR' : 'UP TO 2ND FLOOR';
            s += fStairs(c1 + hW * 0.25, hY + hH * 0.60, pxM * 0.95, pxM * 1.40, stLabel, 7);
        }

        const sdY = hY - dimOff / 2, sdX = hX - dimOff / 2;
        s += subDim(hX, sdY, c1, sdY, `${(houseW * .50).toFixed(2)}m`);
        s += subDim(c1, sdY, hX + hW, sdY, `${(houseW * .50).toFixed(2)}m`);
        s += subDim(hX, hY, hX, r1, `${(houseD * .55).toFixed(2)}m`, 'v', sdX);
        s += subDim(hX, r1, hX, hY + hH, `${(houseD * .45).toFixed(2)}m`, 'v', sdX);
    }

    // ── OUTER Dimension lines (total width/depth) ─────────────────────
    s += outerDim(hX, hY - dimOff + 2, hX + hW, hY - dimOff + 2, `${houseW.toFixed(2)} m`, 'h');
    s += outerDim(hX - dimOff + 2, hY, hX - dimOff + 2, hY + hH, `${houseD.toFixed(2)} m`, 'v');

    // ── Right Technical Specifications Panel ─────────────────────────
    const iX = W - specW + 4, iY = 6;
    s += `<rect x="${iX}" y="${iY}" width="${specW - 8}" height="${H - 12}" fill="#0f172a" stroke="#334155" stroke-width="1" rx="6"/>`;

    // Panel title
    s += `<rect x="${iX}" y="${iY}" width="${specW - 8}" height="28" fill="#1e293b" rx="6"/>`;
    s += `<text x="${iX + (specW - 8) / 2}" y="${iY + 18}" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="900" font-family="'Outfit',sans-serif" letter-spacing="0.5">TECHNICAL SPECS</text>`;

    const specs = [
        `Floor Area: ${Math.round(area)} m\u00b2`,
        `Bedrooms: ${bedrooms} Rooms`,
        `Bathrooms: ${bedrooms > 2 ? 2 : 1} Bath`,
        `Storey: ${floors} Floor${floors > 1 ? 's' : ''} (${floors === 3 ? 'Three-Storey' : floors === 2 ? 'Two-Storey' : 'Bungalow'})`,
        `Foundation: ${floors > 1 ? 'Ground Piers' : 'Strip Footings'}`,
        `Structure: Reinforced CHB`,
        `Roof: Trusses & GI Sheets`,
        `Ceiling Clearance: 2.70m`,
        `Occupancy: Residential`,
        `Region: Davao District`
    ];
    specs.forEach((sp, i) => {
        s += `<text x="${iX + 10}" y="${iY + 44 + i * 16}" fill="${i % 2 === 0 ? '#f1f5f9' : '#cbd5e1'}" font-size="10" font-family="'Outfit',sans-serif">• ${sp}</text>`;
    });

    // Architectural Legend
    const legY0 = iY + 44 + specs.length * 16 + 10;
    s += `<rect x="${iX + 6}" y="${legY0 - 4}" width="${specW - 20}" height="2" fill="#334155"/>`;
    s += `<text x="${iX + (specW - 8) / 2}" y="${legY0 + 13}" text-anchor="middle" fill="#38bdf8" font-size="10.5" font-weight="800" font-family="'Outfit',sans-serif">LEGEND &amp; SYMBOLS</text>`;
    const legs = [
        { c: '#bfdbfe', l: 'Bedroom' },
        { c: '#bae6fd', l: 'Living / Dining' },
        { c: '#fde68a', l: 'Kitchen' },
        { c: '#a5f3fc', l: 'Bathroom' },
    ];
    if (floors > 1) {
        legs.push({ c: '#f8fafc', l: 'Stairs / Access' });
    }
    legs.forEach((lg, i) => {
        const ly = legY0 + 30 + i * 16;
        s += `<rect x="${iX + 10}" y="${ly - 9}" width="12" height="12" fill="${lg.c}" stroke="#64748b" stroke-width="0.8" rx="2"/>`;
        s += `<text x="${iX + 28}" y="${ly}" fill="#e2e8f0" font-size="9.5" font-family="'Outfit',sans-serif">${lg.l}</text>`;
    });

    // Door swing & window mini-legend
    const legW2 = legY0 + 30 + legs.length * 16 + 8;
    const mx2 = iX + 16;
    s += `<path d="M ${mx2} ${legW2 + 8} L ${mx2 + 14} ${legW2 + 8} A 14 14 0 0 0 ${mx2} ${legW2 + 22}" fill="rgba(37,99,235,0.18)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="3,1.5"/>`;
    s += `<text x="${iX + 36}" y="${legW2 + 16}" fill="#cbd5e1" font-size="9.5" font-family="'Outfit',sans-serif">Door Swing</text>`;

    s += `<line x1="${mx2}" y1="${legW2 + 32}" x2="${mx2 + 14}" y2="${legW2 + 32}" stroke="#1e40af" stroke-width="3.5"/>`;
    s += `<line x1="${mx2}" y1="${legW2 + 27}" x2="${mx2 + 14}" y2="${legW2 + 27}" stroke="#93c5fd" stroke-width="0.9"/>`;
    s += `<line x1="${mx2}" y1="${legW2 + 37}" x2="${mx2 + 14}" y2="${legW2 + 37}" stroke="#93c5fd" stroke-width="0.9"/>`;
    s += `<text x="${iX + 36}" y="${legW2 + 34}" fill="#cbd5e1" font-size="9.5" font-family="'Outfit',sans-serif">Window</text>`;

    // North Compass (bottom of panel)
    const naX = iX + (specW - 8) / 2, naY = H - 30;
    s += `<circle cx="${naX}" cy="${naY}" r="17" fill="#1e293b" stroke="#475569" stroke-width="1"/>`;
    s += `<polygon points="${naX},${naY - 13} ${naX - 6},${naY + 5} ${naX + 6},${naY + 5}" fill="#38bdf8"/>`;
    s += `<polygon points="${naX},${naY + 12} ${naX - 5},${naY + 5} ${naX + 5},${naY + 5}" fill="#64748b"/>`;
    s += `<text x="${naX}" y="${naY - 2}" text-anchor="middle" fill="#ffffff" font-size="7.5" font-weight="900" font-family="'Outfit',sans-serif">N</text>`;

    svg.innerHTML = s;
}

/* ── Architectural Floor Plan Helper Functions ─────────────────────── */

// Staircase architectural drafting symbol with step treads, railing line, and direction arrow
function fStairs(x, y, w, h, label = 'UP TO 2ND FLOOR', numSteps = 8) {
    let r = `<g class="arch-stairs">`;
    r += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f8fafc" stroke="#334155" stroke-width="1.2" rx="1.5"/>`;
    const stepH = h / numSteps;
    for (let i = 1; i < numSteps; i++) {
        const sy = y + i * stepH;
        r += `<line x1="${x}" y1="${sy}" x2="${x + w}" y2="${sy}" stroke="#64748b" stroke-width="0.9"/>`;
    }
    r += `<line x1="${x + w * 0.5}" y1="${y + h * 0.1}" x2="${x + w * 0.5}" y2="${y + h * 0.88}" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="2,2"/>`;
    const arrowY = y + h * 0.12;
    r += `<polygon points="${x + w * 0.5},${arrowY - 6} ${x + w * 0.5 - 4},${arrowY + 2} ${x + w * 0.5 + 4},${arrowY + 2}" fill="#0284c7"/>`;
    r += `<rect x="${x + 2}" y="${y + h * 0.5 - 7}" width="${w - 4}" height="14" fill="rgba(15,23,42,0.88)" rx="2"/>`;
    r += `<text x="${x + w * 0.5}" y="${y + h * 0.5 + 3}" text-anchor="middle" fill="#38bdf8" font-size="7.5" font-family="'Outfit',sans-serif" font-weight="900" letter-spacing="0.4">${label}</text>`;
    r += `</g>`;
    return r;
}

// Double-line inner wall (architectural thick wall symbol)
function dblWall(x1, y1, x2, y2, t) {
    const isH = Math.abs(y2 - y1) < Math.abs(x2 - x1);
    const half = t / 2;
    if (isH) {
        return `<rect x="${Math.min(x1, x2)}" y="${y1 - half}" width="${Math.abs(x2 - x1)}" height="${t}" fill="#334155"/>`;
    } else {
        return `<rect x="${x1 - half}" y="${Math.min(y1, y2)}" width="${t}" height="${Math.abs(y2 - y1)}" fill="#334155"/>`;
    }
}

// Room fill rectangle (clipped to inner wall space)
function roomRect(x1, y1, x2, y2, fill) {
    const x = Math.min(x1, x2), y = Math.min(y1, y2);
    const w = Math.abs(x2 - x1), h = Math.abs(y2 - y1);
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" opacity="0.92"/>`;
}

// Door arc (quarter-circle with solid door leaf line)
function archDoor(hX, hY, r, dir, col) {
    const sweep = dir === 'right' ? 1 : 0;
    const ex = hX + r, ey = hY + r;
    return `<line x1="${hX}" y1="${hY}" x2="${ex}" y2="${hY}" stroke="${col}" stroke-width="1.6"/>
    <path d="M ${ex} ${hY} A ${r} ${r} 0 0 ${sweep === 1 ? 0 : 1} ${hX} ${ey}" fill="rgba(37,99,235,0.12)" stroke="${col}" stroke-width="1.2" stroke-dasharray="3,1.5"/>`;
}

// Window symbol — 3 parallel lines on wall edge
function archWin(cx, cy, len, orient) {
    const off = 6;
    if (orient === 'h') {
        return `<line x1="${cx - len / 2}" y1="${cy}" x2="${cx + len / 2}" y2="${cy}" stroke="#1e40af" stroke-width="4.5"/>
        <line x1="${cx - len / 2}" y1="${cy - off}" x2="${cx + len / 2}" y2="${cy - off}" stroke="#93c5fd" stroke-width="1.2"/>
        <line x1="${cx - len / 2}" y1="${cy + off}" x2="${cx + len / 2}" y2="${cy + off}" stroke="#93c5fd" stroke-width="1.2"/>`;
    } else {
        return `<line x1="${cx}" y1="${cy - len / 2}" x2="${cx}" y2="${cy + len / 2}" stroke="#1e40af" stroke-width="4.5"/>
        <line x1="${cx - off}" y1="${cy - len / 2}" x2="${cx - off}" y2="${cy + len / 2}" stroke="#93c5fd" stroke-width="1.2"/>
        <line x1="${cx + off}" y1="${cy - len / 2}" x2="${cx + off}" y2="${cy + len / 2}" stroke="#93c5fd" stroke-width="1.2"/>`;
    }
}

// Bed furniture
function fBed(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.2" rx="3"/>
    <rect x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${h * 0.35}" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="0.9" rx="2"/>
    <line x1="${x + w / 2}" y1="${y + h * 0.4}" x2="${x + w / 2}" y2="${y + h - 3}" stroke="#93c5fd" stroke-width="0.8"/>`;
}

// Sofa
function fSofa(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e0e7ff" stroke="#4338ca" stroke-width="1.2" rx="4"/>
    <rect x="${x + w * .08}" y="${y + h * .15}" width="${w * .84}" height="${h * .65}" fill="#c7d2fe" stroke="#4338ca" stroke-width="0.8" rx="3"/>`;
}

// Round dining table with 4 chairs
function fTable(cx, cy, r) {
    const cr = r * 0.32;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fef9c3" stroke="#854d0e" stroke-width="1.2"/>
    <circle cx="${cx}" cy="${cy - r * 1.5}" r="${cr}" fill="#fef08a" stroke="#854d0e" stroke-width="0.9"/>
    <circle cx="${cx}" cy="${cy + r * 1.5}" r="${cr}" fill="#fef08a" stroke="#854d0e" stroke-width="0.9"/>
    <circle cx="${cx - r * 1.5}" cy="${cy}" r="${cr}" fill="#fef08a" stroke="#854d0e" stroke-width="0.9"/>
    <circle cx="${cx + r * 1.5}" cy="${cy}" r="${cr}" fill="#fef08a" stroke="#854d0e" stroke-width="0.9"/>`;
}

// Toilet
function fToilet(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h * 0.38}" fill="#cffafe" stroke="#0e7490" stroke-width="1" rx="3"/>
    <ellipse cx="${x + w * 0.5}" cy="${y + h * 0.72}" rx="${w * 0.44}" ry="${h * 0.3}" fill="#e0f7fa" stroke="#0e7490" stroke-width="1"/>`;
}

// Sink
function fSink(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e0f7fa" stroke="#0e7490" stroke-width="1" rx="3"/>
    <circle cx="${x + w / 2}" cy="${y + h / 2}" r="${Math.min(w, h) * 0.28}" fill="none" stroke="#0e7490" stroke-width="0.9"/>`;
}

// Kitchen counter L-shape
function fKitchenL(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fef9c3" stroke="#854d0e" stroke-width="1.1" rx="2"/>
    <circle cx="${x + w * 0.27}" cy="${y + h * 0.5}" r="${h * 0.34}" fill="#fef08a" stroke="#854d0e" stroke-width="0.8"/>
    <circle cx="${x + w * 0.65}" cy="${y + h * 0.5}" r="${h * 0.28}" fill="#fef08a" stroke="#854d0e" stroke-width="0.8"/>`;
}

// Sub-dimension line (between partitions, inside plan)
function subDim(x1, y1, x2, y2, label, orient = 'h', vx) {
    const mx = orient === 'h' ? (x1 + x2) / 2 : vx;
    const my = orient === 'h' ? y1 : (y1 + y2) / 2;
    const tickLen = 6;
    const col = '#334155';
    const tCol = '#0f172a';
    if (orient === 'h') {
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="0.9"/>
        <line x1="${x1}" y1="${y1 - tickLen}" x2="${x1}" y2="${y1 + tickLen}" stroke="${col}" stroke-width="0.9"/>
        <line x1="${x2}" y1="${y1 - tickLen}" x2="${x2}" y2="${y1 + tickLen}" stroke="${col}" stroke-width="0.9"/>
        <rect x="${mx - label.length * 3.5}" y="${y1 - 9}" width="${label.length * 7}" height="13" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.5" rx="2"/>
        <text x="${mx}" y="${y1 + 1.5}" text-anchor="middle" fill="${tCol}" font-size="9.5" font-family="'Outfit',monospace" font-weight="700">${label}</text>`;
    } else {
        return `<line x1="${vx}" y1="${y1}" x2="${vx}" y2="${y2}" stroke="${col}" stroke-width="0.9"/>
        <line x1="${vx - tickLen}" y1="${y1}" x2="${vx + tickLen}" y2="${y1}" stroke="${col}" stroke-width="0.9"/>
        <line x1="${vx - tickLen}" y1="${y2}" x2="${vx + tickLen}" y2="${y2}" stroke="${col}" stroke-width="0.9"/>
        <rect x="${vx - label.length * 3.5}" y="${my - 8}" width="${label.length * 7}" height="13" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.5" rx="2" transform="rotate(-90,${vx},${my})"/>
        <text x="${vx}" y="${my + 2.5}" text-anchor="middle" fill="${tCol}" font-size="9.5" font-family="'Outfit',monospace" font-weight="700" transform="rotate(-90,${vx},${my})">${label}</text>`;
    }
}

// Outer main dimension line (total house dimensions)
function outerDim(x1, y1, x2, y2, label, orient) {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const col = '#1d4ed8', tBg = '#ffffff';
    if (orient === 'h') {
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="1.3" marker-start="url(#arrowB)" marker-end="url(#arrow)"/>
        <line x1="${x1}" y1="${y1 - 9}" x2="${x1}" y2="${y1 + 9}" stroke="${col}" stroke-width="1.3"/>
        <line x1="${x2}" y1="${y2 - 9}" x2="${x2}" y2="${y2 + 9}" stroke="${col}" stroke-width="1.3"/>
        <rect x="${mx - label.length * 4.2}" y="${my - 10}" width="${label.length * 8.4}" height="15" fill="${tBg}" stroke="${col}" stroke-width="0.8" rx="3"/>
        <text x="${mx}" y="${my + 2.5}" text-anchor="middle" fill="${col}" font-size="11" font-family="'Outfit',monospace" font-weight="800">${label}</text>`;
    } else {
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="1.3" marker-start="url(#arrowB)" marker-end="url(#arrow)"/>
        <line x1="${x1 - 9}" y1="${y1}" x2="${x1 + 9}" y2="${y1}" stroke="${col}" stroke-width="1.3"/>
        <line x1="${x2 - 9}" y1="${y2}" x2="${x2 + 9}" y2="${y2}" stroke="${col}" stroke-width="1.3"/>
        <rect x="${mx - label.length * 4.2}" y="${my - 9}" width="${label.length * 8.4}" height="15" fill="${tBg}" stroke="${col}" stroke-width="0.8" rx="3" transform="rotate(-90,${mx},${my})"/>
        <text x="${mx}" y="${my + 3}" text-anchor="middle" fill="${col}" font-size="11" font-family="'Outfit',monospace" font-weight="800" transform="rotate(-90,${mx},${my})">${label}</text>`;
    }
}


