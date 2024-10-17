var IShowableClass;
var IGameData;
var ITopProgress;
var ICanCall;
var IComponents;
var ILoadout;
var IExpansor;
var ISelUpgrade;
var ISoftware;
var ICanvas;
var IAutomation;
var IEnergy;
var IScreen;

var secretKey = "DontLookAtMePls";
var saveData;
var waiting = false;

document.addEventListener('DOMContentLoaded', (event) => {

  console.log('DOM fully loaded and parsed');
  createClassInstance()

  passiveImport()
  IShowableClass.init = true;
  saveGameData();
  idleTimeChecker()

});

//an attribute x, with a next attribute = x+ "F", then x will be frozen, and impossible to modify.

class GameData {
  constructor(options) {
    options = options || {}
    this.cells = options.cells || 0;
    this.cellsProd = options.cellsProd || 0;

    this.assimilated = options.assimilated || 0;
    this.maxAssimilated = options.assimilated || 0;
    this.assimilatedProd = options.assimilatedProd || 0;

    this.energy = options.energy || 0;
    this.energyProd = options.energyProd || 0;

    this.potential = options.potential || 0;
    this.potentialProd = options.potentialProd || 0;

    this.tickSpeed = options.tickSpeed || 1;
    this.tickSpeedProd = options.tickSpeedProd || 1

    this.offProgressLimit = options.offProgressLimit || 1800;
    this.lastTick = options.lastTick || Date.now();
    //original tickspeed
    this.tickSpeedOff = options.tickSpeedOff || 0;
    //tickspeed mult temp
    this.tickSpeedMult = options.tickSpeedMult || 0.05;

    this.expansion = options.expansion || 0;
    this.expansionProd = options.expansionProd || 0;
  }
}

class ShowableClass {
  constructor(options) {
    options = options || {}

    this.init = options.init || true;
    this.showable = options.showable || {

      offSave: false,

      valute: true,
      cellsValute: true, assimilatedValute: false, energyValute: false, potentialValute: false,

      core: true, hardware: false, communication: false, options: false, progress: false,

      coreTab: true, hardwareTab: false, softwareTab: false, communicationTab: false,

      visualModule2: true, visualModule3: false,

      loadoutShow: false,

      componentsList: false, component1List: false, component2List: false, component3List: false, componentsButtons: false, componentTab: false, componentsSummary: false,

      hardwareSummary: true, softwareSummary: true, communicationSummary: false,

      //layers
      opaqueScreen: false, hardware1: false, hardware2: false, hardware3: false,
      software1: false, software2: false, software3: false,
      communication1: false, communication2: false, communication3: false,

      //kardashev
      A1: true, A2: false, A3: false,
      A4: false, A5: false, A6: false,
      A7: false, A8: false, A9: false,
      //progress
      p1: true, p2: false,

      //components

      token1: true, token2: false, token3: false, token4: false, token5: false, token6: false, token7: false, token8: false, token9: false, token10: false, token11: false,

      //expansors

      expansor1: true, expansor2: true, expansor3: false, expansor4: false,

      expansor1U1: false, expansor1U2: false,
      expansor2U1: false, expansor2U2: false,
      expansor3U1: false, expansor3U2: false,
      expansor4U1: false, expansor4U2: false,

      monument1: true, monument2: false, monument3: false, monument4: false, monument5: false, monument6: false, monument7: false, monument8: false, monument9: false, monument10: false,

      //assimilation

      assimilation1: true,
      software1assimilationCenter: false,
      assimilationBaseGridbutton1: false,
      assimilationBaseGridbutton2: false,
      assimilationBaseGridbutton3: false,

      //automation
      automation1: false, automation2: false, automation3: false, automation4: false, automation5: false,
    }

  }
}

class TopProgress {
  constructor(options) {
    options = options || {}
    this.actualProgress = options.actualProgress || 1;

    this.progress = Object.freeze({
      p1: "Hardware Layer at 100 cells", p1Check: function () { return IGameData.cells >= 100 },
      p2: "Software Layer at 1e6 cells", p2Check: function () { return IGameData.cells >= (10 ** 6) },
      p3: "Communication Layer at 1e25 cells", p3Check: function () { return IGameData.cells >= (10 ** 25) }
    });

  }
}

class CanCall {
  constructor(options) {
    options = options || {}
    this.offProgressCanCall = options.offProgressCanCall || true;
    this.importSaveCanCall = options.importCanCall || true;
    this.valuesSetterCanCall = options.valuesSetterCanCall || true;
    this.visualLoopFunction = options.visualLoopFunction || true;
  }
}

class Components {
  constructor(options) {
    options = options || {}

    this.selected = options.selected || ""

    this.equipped = options.equipped || {
      component1: "", component2: "", component3: ""
    }

    this.components = options.components || {
      token1: {
        name: "PRODUCER", nameF: true, description: "CELLS/S: ", descriptionF: true, level: 1, maxLevel: 100, effect1: 1, price: 0, tag1: "component1", tag1F: true, priceIdentity: "cells", priceIdentityF: true, image: 'images/token1.png', imageF: true, active: false
      },

      token2: {
        name: "BUILDER", nameF: true, description: "EXPANSION/S ^ ", descriptionF: true, level: 1, maxLevel: 100, effect1: 1, price: 0, tag1: "component1", tag1F: true, priceIdentity: "cells", priceIdentityF: true, image: 'images/token2.png', imageF: true, active: false
      },

      token3: {
        name: "MULTIMAKER", nameF: true, description: "ALL VALUTE/S X: ", descriptionF: true, level: 1, maxLevel: 100, effect1: 1, price: 0, tag1: "component2", tag1F: true, priceIdentity: "cells", priceIdentityF: true, image: 'images/token3.png', imageF: true, active: false
      },

      token4: {
        name: "POPULATION CONVERTER", nameF: true, description: "CELLS/S is reduce by 90%, POPULATION/S X: ", descriptionF: true, level: 1, maxLevel: 100, effect1: 1, price: 0, tag1: "component2", tag1F: true, priceIdentity: "cells", priceIdentityF: true, image: 'images/token4.png', imageF: true, active: false
      },

      token5: {
        name: "ALLY SYNERGY", nameF: true, description: "all equipped COMPONENT EFFECT is boosted X: ", descriptionF: true, level: 1, maxLevel: 100, effect1: 1, price: 0, tag1: "component3", tag1F: true, priceIdentity: "cells", priceIdentityF: true, image: 'images/token5.png', imageF: true, active: false
      },

      token6: {
        name: "ENERGY INFLUX", nameF: true, description: "all valute is reduced by 90%, ENERGY/S X: ", descriptionF: true, level: 1, maxLevel: 100, effect1: 1, price: 0, tag1: "component3", tag1F: true, priceIdentity: "cells", priceIdentityF: true, image: 'images/token6.png', imageF: true, active: false
      },

      token7: {
        name: "UNIVERSAL PRODUCER", nameF: true, description: "AXIOMS/S: ", descriptionF: true, level: 1, maxLevel: 100, effect1: 1, price: 0, tag1: "component3", tag1F: true, priceIdentity: "cells", priceIdentityF: true, image: 'images/token7.png', imageF: true, active: false
      },

      token8: {
        name: "ENERGIZED THING1", nameF: true, description: "AXIOMS/S: ", descriptionF: true, level: 1, maxLevel: 100, effect1: 1, price: 0, tag1: "component3", tag1F: true, priceIdentity: "cells", priceIdentityF: true, image: 'images/token8.png', imageF: true, active: false
      },

      token9: {
        name: "ENERGIZED THING2", nameF: true, description: "AXIOMS/S: ", descriptionF: true, level: 1, maxLevel: 100, effect1: 1, price: 0, tag1: "component3", tag1F: true, priceIdentity: "cells", priceIdentityF: true, image: 'images/token_4.png', imageF: true, active: false
      },

      token10: {
        name: "ENERGIZED THING3", nameF: true, description: "AXIOMS/S: ", descriptionF: true, level: 1, maxLevel: 100, effect1: 1, price: 0, tag1: "component3", tag1F: true, priceIdentity: "cells", priceIdentityF: true, image: 'images/token_4.png', imageF: true, active: false
      },

      token11: {
        name: "ENERGIZED THING4", nameF: true, description: "AXIOMS/S: ", descriptionF: true, level: 1, maxLevel: 100, effect1: 1, price: 0, tag1: "component3", tag1F: true, priceIdentity: "cells", priceIdentityF: true, image: 'images/token_4.png', imageF: true, active: false
      },
    }
  }
}

class Loadout {
  constructor(options) {
    options = options || {}
    this.componentsLoadout = options.componentsLoadout || {
      loadout1: {
        name: "", component1: "", component2: "", component3: ""
      },

      loadout2: {
        name: "", component1: "", component2: "", component3: ""
      },

      loadout3: {
        name: "", component1: "", component2: "", component3: ""
      }
    }
  }
}

class Expansor {
  constructor(options) {
    options = options || {}
    this.expansors = options.expansors || {
      expansor1: {
        name: "Unit", nameF: true, description: "EXPANSION/S: ", descriptionF: true, level: 0, maxLevel: 2401, effect: 0, price1: 0, price2: 0, price3: 0, price4: 0, priceIdentity1: "cells", priceIdentity1F: true, priceIdentity2: "", priceIdentity2F: true, priceIdentity3: "", priceIdentity3F: true, priceIdentity4: "", priceIdentity4F: true
      },

      expansor2: {
        name: "Block", nameF: true, description: "UNIT Max Level: ", descriptionF: true, level: 0, maxLevel: 343, effect: 0, price1: 0, price2: 0, price3: 0, price4: 0, priceIdentity1: "cells", priceIdentity1F: true, priceIdentity2: "assimilated", priceIdentity2F: true, priceIdentity3: "", priceIdentity3F: true, priceIdentity4: "", priceIdentity4F: true
      },

      expansor3: {
        name: "Sector", nameF: true, description: "UNIT PRICE/:", descriptionF: true, level: 0, maxLevel: 49, effect: 0, price1: 0, price2: 0, price3: 0, price4: 0, priceIdentity1: "cells", priceIdentity1F: true, priceIdentity2: "assimilated", priceIdentity2F: true, priceIdentity3: "energy", priceIdentity3F: true, priceIdentity4: "", priceIdentity4F: true
      },

      expansor4: {
        name: "Cluster", nameF: true, description: "Sector: x ", descriptionF: true, level: 0, maxLevel: 7, effect: 0, price1: 0, price2: 0, price3: 0, price4: 0, priceIdentity1: "cells", priceIdentity1F: true, priceIdentity2: "assimilated", priceIdentity2F: true, priceIdentity3: "energy", priceIdentity3F: true, priceIdentity4: "potential", priceIdentity4F: true
      },
    }

    this.expansorsUpgrades = options.expansorsUpgrades || {
      expansor1U1: {
        description: "UNIT effect gives CELLS/S: ", descriptionF: true, effect: 0, group: "group1", groupF: false, descriptionF: true, active: false
      },

      expansor1U2: {
        description: "UNIT boosts EXPANSION/S: ", descriptionF: true, effect: 0, group: "group1", groupF: false, descriptionF: true, active: false
      },

      expansor2U1: {
        description: "MAX POPULATION X: ", descriptionF: true, effect: 0, group: "group3", groupF: false, descriptionF: true, active: false
      },

      expansor2U2: {
        description: "SECTOR makes UNIT cheaper /: ", descriptionF: true, effect: 0, group: "group3", groupF: false, descriptionF: true, active: false
      },

      expansor3U1: {
        description: "", descriptionF: true, effect: 0, group: "", groupF: false, descriptionF: true, active: false
      },

      expansor3U2: {
        description: "", descriptionF: true, effect: 0, group: "", groupF: false, descriptionF: true, active: false
      },

      expansor4U1: {
        description: "", descriptionF: true, effect: 0, group: "", groupF: false, descriptionF: true, active: false
      },

      expansor4U2: {
        description: "", descriptionF: true, effect: 0, group: "", groupF: false, descriptionF: true, active: false
      },
    }

    this.monumentImage = options.monumentImage || 1;

    this.showMonuments = options.showMonuments || true;

    this.monuments = options.monuments || {
      //req1: cells, req2: assimilation, req3: energy, req4: potential
      monument1: {
        name: "Big Structures", nameF: true, req1: 0, req2: 0, req3: 0, req4: 0, unlocked: "Hardware Component: Builder", unlockedF: true, active: false
      },

      monument2: {
        name: "Builder Drones", nameF: true, req1: 0, req2: 0, req3: 0, req4: 0, unlocked: "Hardware 1: Automation: Unit", unlockedF: true, active: false
      },

      monument3: {
        name: "Unit Accessories", nameF: true, req1: 0, req2: 0, req3: 0, req4: 0, unlocked: "Hardware 1: Unit Upgrades", unlockedF: true, active: false
      },

      monument4: {
        name: "Double Room Unit", nameF: true, req1: 0, req2: 0, req3: 0, req4: 0, unlocked: "Hardware 1: Unit Upgrades both active", unlockedF: true, active: false
      },

      monument5: {
        name: "New Horizons", nameF: true, req1: 0, req2: 0, req3: 0, req4: 0, unlocked: "New Layers", unlockedF: true, active: false
      },

      monument6: {
        name: "Modular Component", nameF: true, req1: 0, req2: 0, req3: 0, req4: 0, unlocked: "Software Component: Multimaker", unlockedF: true, active: false
      },

      monument7: {
        name: "Drones Swarm", nameF: true, req1: 0, req2: 0, req3: 0, req4: 0, unlocked: "Hardware 2: Automation: Block", unlockedF: true, active: false
      },

      monument8: {
        name: "Easy Block Transportation", nameF: true, req1: 0, req2: 0, req3: 0, req4: 0, unlocked: "Hardware 2: Block Upgrades", unlockedF: true, active: false
      },

      monument9: {
        name: "Man Free Duties", nameF: true, req1: 0, req2: 0, req3: 0, req4: 0, unlocked: "Hardware 2: Block Upgrades both active", unlockedF: true, active: false
      },

      monument10: {
        name: "Multi Layer City", nameF: true, req1: 0, req2: 0, req3: 0, req4: 0, unlocked: "New Layers", unlockedF: true, active: false
      },


    }
  }
}

class SelUpgrade {
  constructor(options) {
    options = options || {}
    this.group = options.group || {

      //expansor Upgrades 1
      group1: {
        num: 0, maxNum: 1, lastSel: "", maxNumF: true
      },

      //assimilation Upgrades
      group2: {
        num: 0, maxNum: 5, lastSel: "", maxNumF: true
      },

      //expansor upgrades 2
      group3: {
        num: 0, maxNum: 1, lastSel: "", maxNumF: true
      },

      group4: {
        num: 0, maxNum: 1, lastSel: "", maxNumF: true
      },
    }
  }
}

class Software {
  constructor(options) {
    options = options || {}

    this.currentTier = options.currentTier || 1;

    this.upgrades = options.upgrades || {
      softUpgrade1: {
        name: "MAX POPULATION X: ", nameF: true, level: 0, maxLevel: 10, effect: 1, price: 111, priceIdentity: "assimilated", priceIdentityF: true,
      },

      softUpgrade2: {
        name: "POPULATION/S X: ", nameF: true, level: 0, maxLevel: 10, effect: 1, price: 0, priceIdentity: "assimilated", priceIdentityF: true,
      },

      softUpgrade3: {
        name: "T1 COMPONENTS Price /: ", nameF: true, level: 0, maxLevel: 10, effect: 1, price: 0, priceIdentity: "assimilated", priceIdentityF: true,
      },

      softUpgrade4: {
        name: "POPULATION CENTER selectable: ", nameF: true, level: 0, maxLevel: 10, effect: 1, price: 0, priceIdentity: "assimilated", priceIdentityF: true,
      },
/*
      softUpgrade5: {
        name: "MAX POPULATION X: ", nameF: true, level: 0, maxLevel: 10, effect: 1, price: 111, priceIdentity: "assimilated", priceIdentityF: true,
      },

      softUpgrade6: {
        name: "TIER boost ASSIM. CENTER: ", nameF: true, level: 0, maxLevel: 10, effect: 1, price: 0, priceIdentity: "assimilated", priceIdentityF: true,
      },

      softUpgrade7: {
        name: "ENERGY UPGRADES PRICE /:", nameF: true, level: 0, maxLevel: 10, effect: 1, price: 0, priceIdentity: "assimilated", priceIdentityF: true,
      },

      softUpgrade8: {
        name: "POPULATION CENTER selectable: ", nameF: true, level: 0, maxLevel: 10, effect: 1, price: 0, priceIdentity: "assimilated", priceIdentityF: true,
      },
      */
    }

    this.assimilationCenter = options.assimilationCenter || {
      button1: {
        name: "Open Population Center", description: "MAX POPULATION X: ", effect: 0, price: 0, priceIdentity: "ASSIMILATED", group: "group2", active: false, nameF: true, descriptionF: true
      },

      button2: {
        name: "Intranet Jobs", description: "boost CELLS/S by: ", effect: 0, price: 0, priceIdentity: "POPULATION", group: "group2", active: false, nameF: true, descriptionF: true
      },

      button3: {
        name: "Deep Sleep Protocol", description: "boost POPULATION/S by: ", effect: 0, price: 0, priceIdentity: "POPULATION", group: "group2", active: false, nameF: true, descriptionF: true
      },

      /*
      button4: {
        name: "Deeper Processes", description: "MAX POPULATION boosts POPULATION/S: ", effect: 0, price: 0, priceIdentity: "POPULATION", group: "group2", active: false, nameF: true, descriptionF: true
      },

      button5: {
        name: "Centralized Energy", description: "boost ENERGY/S by: ", effect: 0, price: 0, priceIdentity: "POPULATION", group: "group2", active: false, nameF: true, descriptionF: true
      },

      button6: {
        name: "Global Intranet", description: "boost TICKSPEED by: ", effect: 0, price: 0, priceIdentity: "POPULATION", group: "group2", active: false, nameF: true, descriptionF: true
      },

      button7: {
        name: "Tecnological Revolution", description: "TIER boost is doubled: ", effect: 0, price: 0, priceIdentity: "POPULATION", group: "group2", active: false, nameF: true, descriptionF: true
      },

      button8: {
        name: "Potential Feeders", description: "boost POTENTIAL/S by: ", effect: 0, price: 0, priceIdentity: "POPULATION", group: "group2", active: false, nameF: true, descriptionF: true
      },

      button9: {
        name: "Netsphere Prototype", description: "TIER 1 COMPONENTS are stronger", effect: 0, price: 0, priceIdentity: "POPULATION", group: "group2", active: false, nameF: true, descriptionF: true
      },
      */
    }
  }
}

class Energy {
  constructor(options) {
    options = options || {}

    this.energyUpgrades = options.energyUpgrades || {

      energyButton1: {
        name: "ENERGY/S: ", nameF: true, level: 0, maxLevel: 10, effect: 1, price: 0, priceIdentity: "cells", priceIdentityF: true,
      },
      energyButton2: {
        name: "All ENERGY UPGRADES X: ", nameF: true, level: 0, maxLevel: 10, effect: 1, price: 0, priceIdentity: "cells", priceIdentityF: true,
      },
      energyButton3: {
        name: "All ENERGY COMPONENTS X: ", nameF: true, level: 0, maxLevel: 10, effect: 1, price: 0, priceIdentity: "cells", priceIdentityF: true,
      },
      energyButton4: {
        name: "ENERGY boosts all VALUTES X: ", nameF: true, level: 0, maxLevel: 10, effect: 1, price: 0, priceIdentity: "cells", priceIdentityF: true,
      },
      energyButton5: {
        name: "OVERCLOCK effect X: ", nameF: true, level: 0, maxLevel: 10, effect: 1, price: 0, priceIdentity: "cells", priceIdentityF: true,
      },
      energyButton6: {
        name: "OVERCLOCK quantity: ", nameF: true, level: 0, maxLevel: 10, effect: 1, price: 0, priceIdentity: "cells", priceIdentityF: true,
      },

    }

  }
}

class Canvas {
  constructor(options) {
    options = options || {}

    // it works with percetiles
    this.screen = options.screen || {
      line1: {
        startX: 0.1, startY: 0.5, controlPX: 0.1, controlPY: 0.5, endX: 0.3, endY: 0.3, active: false, startXF: true, startYF: true, controlPXF: true, controlPYF: true, endXF: true, endYF: true, activeF: true
      },
      line2: {
        startX: 0.1, startY: 0.5, controlPX: 0.1, controlPY: 0.5, endX: 0.3, endY: 0.7, active: false, startXF: true, startYF: true, controlPXF: true, controlPYF: true, endXF: true, endYF: true, activeF: true
      },
      line3: {
        startX: 0.3, startY: 0.3, controlPX: 0.3, controlPY: 0.3, endX: 0.7, endY: 0.7, active: false, startXF: true, startYF: true, controlPXF: true, controlPYF: true, endXF: true, endYF: true, activeF: true
      },
      line4: {
        startX: 0.3, startY: 0.7, controlPX: 0.3, controlPY: 0.7, endX: 0.7, endY: 0.3, active: false, startXF: true, startYF: true, controlPXF: true, controlPYF: true, endXF: true, endYF: true, activeF: true
      },
      line5: {
        startX: 0.5, startY: 0.1, controlPX: 0.5, controlPY: 0.1, endX: 0.9, endY: 0.5, active: false, startXF: true, startYF: true, controlPXF: true, controlPYF: true, endXF: true, endYF: true, activeF: true
      },
      line6: {
        startX: 0.5, startY: 0.9, controlPX: 0.5, controlPY: 0.9, endX: 0.9, endY: 0.5, active: false, startXF: true, startYF: true, controlPXF: true, controlPYF: true, endXF: true, endYF: true, activeF: true
      },
      line7: {
        startX: 0.1, startY: 0.5, controlPX: 0.1, controlPY: 0.5, endX: 0.5, endY: 0.1, active: false, startXF: true, startYF: true, controlPXF: true, controlPYF: true, endXF: true, endYF: true, activeF: true
      },
      line8: {
        startX: 0.1, startY: 0.5, controlPX: 0.1, controlPY: 0.5, endX: 0.5, endY: 0.9, active: false, startXF: true, startYF: true, controlPXF: true, controlPYF: true, endXF: true, endYF: true, activeF: true
      },
      line9: {
        startX: 0.3, startY: 0.3, controlPX: 0.3, controlPY: 0.3, endX: 0.7, endY: 0.7, active: false, startXF: true, startYF: true, controlPXF: true, controlPYF: true, endXF: true, endYF: true, activeF: true
      },
      line10: {
        startX: 0.3, startY: 0.7, controlPX: 0.3, controlPY: 0.7, endX: 0.7, endY: 0.3, active: false, startXF: true, startYF: true, controlPXF: true, controlPYF: true, endXF: true, endYF: true, activeF: true
      },
      line11: {
        startX: 0.5, startY: 0.1, controlPX: 0.5, controlPY: 0.1, endX: 0.9, endY: 0.5, active: false, startXF: true, startYF: true, controlPXF: true, controlPYF: true, endXF: true, endYF: true, activeF: true
      },
      line12: {
        startX: 0.5, startY: 0.9, controlPX: 0.5, controlPY: 0.9, endX: 0.9, endY: 0.5, active: false, startXF: true, startYF: true, controlPXF: true, controlPYF: true, endXF: true, endYF: true, activeF: true
      },

    }
  }
}

class Automation {
  constructor(options) {
    options = options || {}

    this.automators = options.automators || {

      automation1: {
        name: "UNIT AUTOMATION", description: "Autobuys UNIT, when you have enough to buy, costs nothing", active: false, nameF: true, descriptionF: true
      },
      automation2: {
        name: "BLOCK AUTOMATION", description: "Autobuys BLOCK, when you have enough to buy, costs nothing", active: false, nameF: true, descriptionF: true
      },
      automation3: {
        name: "SECTOR AUTOMATION", description: "Autobuys SECTOR, when you have enough to buy, costs nothing", active: false, nameF: true, descriptionF: true
      },
      automation4: {
        name: "CLUSTER AUTOMATION", description: "Autobuys CLUSTER, when you have enough to buy, costs nothing", active: false, nameF: true, descriptionF: true
      },

      automation5: {
        name: "SOFTWARE AUTOMATION", description: "Autobuys SOFTWARE UPGRADES, when you have enough to buy", active: false, nameF: true, descriptionF: true
      }
    }
  }
}

class Screen {
  constructor(options) {
    options = options || {}

    this.screens = options.screens || {
      A1: {
        name: "Hardware 1", feature1: "", feature2: "", active: true, nameF: true, feature1F: true, feature2F: true, activeF: true
      },
      A2: {
        name: "Software 1", feature1: "", feature2: "", active: false, nameF: true, feature1F: true, feature2F: true, activeF: true
      },
      A3: {
        name: "Hardware 2", feature1: "", feature2: "", active: false, nameF: true, feature1F: true, feature2F: true, activeF: true
      },
      A4: {
        name: "software 2", feature1: "", feature2: "", active: false, nameF: true, feature1F: true, feature2F: true, activeF: true
      },
      A5: {
        name: "Communication 1", feature1: "", feature2: "", active: false, nameF: true, feature1F: true, feature2F: true, activeF: true
      },
      A6: {
        name: "Hardware 3", feature1: "", feature2: "", active: false, nameF: true, feature1F: true, feature2F: true, activeF: true
      },
      A7: {
        name: "Communication 2", feature1: "", feature2: "", active: false, nameF: true, feature1F: true, feature2F: true, activeF: true
      },
      A8: {
        name: "Software 3", feature1: "", feature2: "", active: false, nameF: true, feature1F: true, feature2F: true, activeF: true
      },
      A9: {
        name: "Communication 3", feature1: "", feature2: "", active: false, nameF: true, feature1F: true, feature2F: true, activeF: true
      },
    }

  }
}

//SAVING

function createClassInstance() {

  IShowableClass = new ShowableClass();
  IGameData = new GameData();
  ITopProgress = new TopProgress();
  ICanCall = new CanCall();
  IComponents = new Components();
  ILoadout = new Loadout();
  IExpansor = new Expansor();
  ISelUpgrade = new SelUpgrade();
  ISoftware = new Software();
  ICanvas = new Canvas();
  IAutomation = new Automation();
  IEnergy = new Energy();
  IScreen = new Screen();
}

function createSaveData() {
  saveData = {
    IShowableClass: IShowableClass,
    IGameData: IGameData,
    ITopProgress: ITopProgress,
    ICanCall: ICanCall,
    IComponents: IComponents,
    ILoadout: ILoadout,
    IExpansor: IExpansor,
    ISelUpgrade: ISelUpgrade,
    ISoftware: ISoftware,
    ICanvas: ICanvas,
    IAutomation: IAutomation,
    IEnergy: IEnergy,
    IScreen: IScreen,
  };
}

function saveGameData() {
  createSaveData()
  const stringifiedData = JSON.stringify(saveData);
  localStorage.setItem("HyperStructureSave", stringifiedData);

}

function resetSave() {
  createClassInstance()
  createSaveData()
  const stringifiedData = JSON.stringify(saveData);
  localStorage.setItem("HyperStructureSave", stringifiedData);
}

function deepMerge(obj1, obj2) {
  for (let key in obj1) {
    if (obj2.hasOwnProperty(key)) {
      if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
        obj1[key] = deepMerge(obj1[key], obj2[key]);
      } else {
        //check if it must be frozen
        if (obj1[key + "F"]) {
        }
        else {
          obj1[key] = obj2[key];
        }
      }
    }
  }
  return obj1;
}

function encryptData(data, key) {
  return CryptoJS.AES.encrypt(data, key).toString();
}


function decryptData(data, key) {
  var bytes = CryptoJS.AES.decrypt(data, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function exportSave() {
  saveGameData();
  var exportSaveData = localStorage.getItem("HyperStructureSave");
  var encryptedData = CryptoJS.AES.encrypt(exportSaveData, secretKey).toString();
  document.getElementById("Save").value = encryptedData;
}

function offExportSave() {
  saveGameData();
  var exportSaveData = localStorage.getItem("HyperStructureSave");
  var encryptedData = CryptoJS.AES.encrypt(exportSaveData, secretKey).toString();
  document.getElementById("offSave").value = encryptedData;
}

function importSave() {
  var encryptedData = document.getElementById("Save").value;
  const decryptedData = decryptData(encryptedData, secretKey);
  try {
    var savedGameData = JSON.parse(decryptedData);
    for (let x in savedGameData) {
      if (saveData[x]) {
        deepMerge(saveData[x], savedGameData[x]);
      }
    }
  } catch (e) {
    console.error("Errore nella decifratura o parsing dei dati: ", e);
  }

}

function passiveImport() {
  if (localStorage.getItem("HyperStructureSave") !== null) {

    var encryptedData = JSON.parse(localStorage.getItem("HyperStructureSave"));
    try {
      var savedGameData = encryptedData;
      for (let x in savedGameData) {
        saveGameData()
        if (saveData[x]) {
          deepMerge(saveData[x], savedGameData[x]);
        }
      }
    } catch (e) {
      console.error("Errore nella decifratura o parsing dei dati: ", e);
    }
  }
}

function offImportSave() {
  var encryptedData = document.getElementById("offSave").value;
  const decryptedData = decryptData(encryptedData, secretKey);
  try {
    var savedGameData = JSON.parse(decryptedData);
    for (let x in savedGameData) {
      if (saveData[x]) {
        deepMerge(saveData[x], savedGameData[x]);
      }
    }
  } catch (e) {
    console.error("Errore nella decifratura o parsing dei dati: ", e);
  }
}

function salva(x) {
  const dati = {};
  for (let key of Object.keys(x)) {
    dati[key] = this[key];
  }
  return dati;
}

function carica(a, b) {
  var importedData = document.getElementById("Save").value;
  localStorage.setItem("personaData", importedData);

  const dati = localStorage.getItem('personaData');
  if (dati) {
    const parsedData = JSON.parse(dati);
    var deepMergeValue = deepMerge(a, b);
    return deepMergeValue;
  }
  return null;
}

//COSE DA FARE/AGGIUNTE

function update(id, content) {
  document.getElementById(id).innerHTML = content;
}

function updateClass(cla, content) {
  var update = document.getElementsByClassName(cla);
  var x = 0;

  while (update[x] != null) {
    update[x].innerHTML = content;
    x++;
  }
}

//LOADOUT

function componentsLoadoutSave(number) {
  var associatedLoad = "loadout" + number

  ILoadout.componentsLoadout[associatedLoad].component1 = IComponents.equipped.component1
  ILoadout.componentsLoadout[associatedLoad].component2 = IComponents.equipped.component2
  ILoadout.componentsLoadout[associatedLoad].component3 = IComponents.equipped.component3

}

function componentsLoadoutLoad(number) {
  var associatedLoad = "loadout" + number

  equipComponent(ILoadout.componentsLoadout[associatedLoad].component1, "component1")
  equipComponent(ILoadout.componentsLoadout[associatedLoad].component2, "component2")
  equipComponent(ILoadout.componentsLoadout[associatedLoad].component3, "component3")

}

function componentsLoadoutName(number, enter) {
  var loadout = document.getElementById("loadoutName" + number)
  var id = "loadout" + number
  if (enter == true) {
    loadout.disabled = false;
    ILoadout.componentsLoadout[id].name = loadout.value

  }

  if (enter == false) {
    loadout.disabled = true;
    ILoadout.componentsLoadout[id].name = loadout.value
  }
}
//VISUAL ALL LAYERS

function visualValute() {
  update("cellsValuteBase", format(IGameData.cells) + " CELLS")
  update("cellsValuteProd", " + " + format(sec(IGameData.cellsProd)) + " CELLS/S")

  update("assimilatedValuteBase", format(IGameData.assimilated) + " POPULATION")
  update("assimilatedValuteProd", " + " + format(sec(IGameData.assimilatedProd)) + " POPULATION/S")

  update("energyValuteBase", format(IGameData.energy) + " ENERGY")
  update("energyValuteProd", " + " + format(sec(IGameData.energyProd)) + " ENERGY/S")

  update("potentialValuteBase", format(IGameData.potential) + " POTENTIAL")
  update("potentialValuteProd", " + " + format(sec(IGameData.potentialProd)) + " POTENTIAL/S")

}

function visualComponents() {
  //components list
  for (let x in IComponents.components) {
    let obComp = document.getElementById(x)

    obComp.setAttribute("onclick", "visualComponentInfo(" + "'" + x + "'" + ")");

    obComp.style.backgroundImage = "url('" + IComponents.components[x].image + "')";

    obComp.style.backgroundSize = "100%";
  }

  //components images
  for (let y in IComponents.equipped) {
    var imageModule = y + "Module"

    if (IComponents.equipped[y] == "") {
      document.getElementById(imageModule).style.background = "url(images/plus.png)";
      document.getElementById(imageModule).style.backgroundSize = "100%";
    }
    else {

      var selectedComp = IComponents.equipped[y]

      document.getElementById(imageModule).style.background = "url('" + IComponents.components[selectedComp].image + "')"
      document.getElementById(imageModule).style.backgroundSize = "100%";
    }
  }

  //component summary
  for (let y in IComponents.equipped) {

    if (IComponents.equipped[y] == "") {
      updateClass(y + "Effect1", "")
    }
    else {

      var selectedComp = IComponents.equipped[y]

      var description = IComponents.components[selectedComp].description
      var effect1 = IComponents.components[selectedComp].effect1

      updateClass(y + "Effect1", description + " " + format(effect1))
    }
  }
}

function visualComponentInfo(id) {

  var sel = IComponents.components[id]
  IComponents.selected = id

  for (let x in IComponents.components) {
    var selId = document.getElementById(x)
    if (x == id) {
      selId.style.boxShadow = 'inset 0 0 0 2px #ff0000';
    }

    else {
      selId.style.boxShadow = 'inset 0 0 0 2px #ffffff'
    }
  }

  if (id == "") {
    update("componentLevel", "");
    update("componentName", "");
    update("componentEffect", "");

    update("componentsLevelUpDiv", "LEVEL UP: ")
  }

  else {

    unlockShow("componentTab", true)
    unlockShow("loadoutShow", true)
    unlockShow("componentsButtons", true)
    unlockShow("componentsSummary", true)

    update("componentLevel", sel.level + " / " + sel.maxLevel);
    update("componentName", sel.name);
    update("componentEffect", sel.description + " " + format(sel.effect1));

    update("componentsLevelUpDiv", "<div>LEVEL UP: </div>" + "<div>" + format(sel.price) + " " + sel.priceIdentity + "</div>")
  }
}

function visualComponentsLoadout() {

  var cont = 0;
  for (let x in ILoadout.componentsLoadout) {
    var loadout = document.getElementById("loadoutName" + (cont + 1))
    if (loadout.disabled) {
      loadout.value = ILoadout.componentsLoadout[x].name;
    }

    cont = cont + 1;
  }
}

function showComponents(componentType) {

  unlockShow("componentsList", true)

  unlockShow("component1List", false)
  unlockShow("component2List", false)
  unlockShow("component3List", false)


  unlockShow(componentType + "List", true)

  if (IComponents.equipped[componentType] != "") {
    visualComponentInfo(IComponents.equipped[componentType])
  }
}

//top progress

function visualProgress() {
  var locator = ITopProgress.actualProgress;

  update("progressTab", ITopProgress.progress["p" + locator])

}

//visual expansor

function visualHardware() {
  //expansorName

  var expansionValute;

  if (IGameData.expansion == 0) {
    expansionValute = 0;
  }
  else {
    expansionValute = IExpansor.expansors.expansor1.effect
  }

  update("hardware1Info", "<div> EXPANSION: " + format(IGameData.expansionProd) + "</div> <div>EXPANSORS</div> <div>EXPANSION multiply CELLS/S by: " + format(IGameData.expansion) + "</div>")

  //expansors

  for (let x in IExpansor.expansors) {

    var selExp = IExpansor.expansors[x]
    //...............................
    if (selExp.priceIdentity1 != "") {
      var pId1 = selExp.priceIdentity1 + ":"
      var pId1P = format(selExp.price1)
    }
    else {
      var pId1 = ""
      var pId1P = ""
    }
    //...............................
    if (selExp.priceIdentity2 != "") {
      var pId2 = selExp.priceIdentity2 + ":"
      var pId2P = format(selExp.price2)
    }
    else {
      var pId2 = ""
      var pId2P = ""
    }
    //...............................
    if (selExp.priceIdentity3 != "") {
      var pId3 = selExp.priceIdentity3 + ":"
      var pId3P = format(selExp.price3)
    }
    else {
      var pId3 = ""
      var pId3P = ""
    }
    //...............................
    if (selExp.priceIdentity4 != "") {
      var pId4 = selExp.priceIdentity4 + ":"
      var pId4P = format(selExp.price4)
    }
    else {
      var pId4 = ""
      var pId4P = ""
    }


    update(x + "Name", selExp.name)
    update(x + "Effect", selExp.description + " " + format(selExp.effect))
    update(x + "Level", "<div>" + selExp.level + "</div>" + "<hr />" + "<div>" + selExp.maxLevel + "</div>")
    update(x + "Price", "<div>" + pId1 + pId1P + "</div>" +
      "<div>" + pId2 + pId2P + "</div>" +
      "<div>" + pId3 + pId3P + "</div>" +
      "<div>" + pId4 + pId4P + "</div>"
    )
  }

  var im = document.getElementById("expansorImagePlace").style
  var sel = IExpansor.expansors
  //expansorImage
  switch (IExpansor.monumentImage) {
    case 1:
      im.backgroundImage = "url(images/unit1.png)"
      if (sel.expansor1.level == 2) {
        IExpansor.monumentImage = 2
      }
      break;

    case 2:
      im.backgroundImage = "url(images/unit2.png)"
      if (sel.expansor1.level == 3) {
        IExpansor.monumentImage = 3
      }
      break;

    case 3:
      im.backgroundImage = 'url(images/unit3.png)'
      if (sel.expansor1.level == 4) {
        IExpansor.monumentImage = 4
      }
      break;

    case 4:
      im.backgroundImage = 'url(images/unit4.png)'
      if (sel.expansor1.level == 5) {
        IExpansor.monumentImage = 5
      }
      break;

    case 5:
      im.backgroundImage = 'url(images/unit5.png)'
      if (sel.expansor1.level == 6) {
        IExpansor.monumentImage = 6
      }
      break;

    case 6:
      im.backgroundImage = 'url(images/unit6.png)'
      if (sel.expansor1.level == 7) {
        IExpansor.monumentImage = 7
      }
      break;

    case 7:
      im.backgroundImage = 'url(images/unit7.png)'
      if (sel.expansor2.level == 1) {
        IExpansor.monumentImage = 8
      }
      break;

    case 8:
      im.backgroundImage = 'url(images/block1.png)'
      if (sel.expansor2.level == 2) {
        IExpansor.monumentImage = 9
      }
      break;

    case 9:
      im.backgroundImage = 'url(images/block2.png)'
      if (sel.expansor2.level == 3) {
        IExpansor.monumentImage = 10
      }
      break;

    case 10:
      im.backgroundImage = 'url(images/block3.png)'
      if (sel.expansor2.level == 4) {
        IExpansor.monumentImage = 11
      }
      break;

    case 11:
      im.backgroundImage = 'url(images/block4.png)'
      if (sel.expansor2.level == 5) {
        IExpansor.monumentImage = 12
      }
      break;

    case 12:
      im.backgroundImage = 'url(images/block5.png)'
      if (sel.expansor2.level == 6) {
        IExpansor.monumentImage = 13
      }
      break;

    case 13:
      im.backgroundImage = 'url(images/block6.png)'
      if (sel.expansor2.level == 7) {
        IExpansor.monumentImage = 14
      }
      break;

    case 14:
      im.backgroundImage = 'url(images/block7.png)'
      if (sel.expansor3.level == 1) {
        IExpansor.monumentImage = 15
      }
      break;

    case 15:
      im.backgroundImage = 'url(images/sector1.png)'
      if (sel.expansor3.level == 2) {
        IExpansor.monumentImage = 16
      }
      break;

    case 16:
      im.backgroundImage = 'url(images/sector2.png)'
      if (sel.expansor3.level == 3) {
        IExpansor.monumentImage = 17
      }
      break;

    case 17:
      im.backgroundImage = 'url(images/sector3.png)'
      if (sel.expansor3.level == 4) {
        IExpansor.monumentImage = 18
      }
      break;

    case 18:
      im.backgroundImage = 'url(images/sector4.png)'
      if (sel.expansor3.level == 5) {
        IExpansor.monumentImage = 19
      }
      break;

    case 19:
      im.backgroundImage = 'url(images/sector5.png)'
      if (sel.expansor3.level == 6) {
        IExpansor.monumentImage = 20
      }
      break;

    case 20:
      im.backgroundImage = 'url(images/sector6.png)'
      if (sel.expansor3.level == 7) {
        IExpansor.monumentImage = 21
      }
      break;

    case 21:
      im.backgroundImage = 'url(images/sector7.png)'
      if (sel.expansor4.level == 2) {
        IExpansor.monumentImage = 22
      }
      break;

    case 22:
      im.backgroundImage = 'url(images/cluster1.png)'
      if (sel.expansor4.level == 2) {
        IExpansor.monumentImage = 23
      }
      break;

    case 23:
      im.backgroundImage = 'url(images/cluster2.png)'
      if (sel.expansor4.level == 3) {
        IExpansor.monumentImage = 24
      }
      break;

    case 24:
      im.backgroundImage = 'url(images/cluster3.png)'
      if (sel.expansor4.level == 4) {
        IExpansor.monumentImage = 25
      }
      break;

    case 25:
      im.backgroundImage = 'url(images/cluster4.png)'
      if (sel.expansor4.level == 5) {
        IExpansor.monumentImage = 26
      }
      break;

    case 26:
      im.backgroundImage = 'url(images/cluster5.png)'
      if (sel.expansor4.level == 6) {
        IExpansor.monumentImage = 27
      }
      break;

    case 27:
      im.backgroundImage = 'url(images/cluster6.png)'
      if (sel.expansor4.level == 7) {
        IExpansor.monumentImage = 28
      }
      break;

    case 28:
      im.backgroundImage = 'url(images/cluster7.png)'
  }

  //expansorUpgrades

  for (let x in IExpansor.expansorsUpgrades) {
    var selExp = IExpansor.expansorsUpgrades[x]

    update(x, "<div>" + selExp.description + "</div>" + "<div>" + format(selExp.effect) + "</div>")

    if (selExp.active) {
      document.getElementById(x).style.background = "#174d00"
    }
    else {
      document.getElementById(x).style.background = ""
    }

  }

  //monuments

  checkShow("assimilatedValute")

  if (checkShow("cellsValute")) {
    var valute1 = "CELLS/S"
  }
  else { var valute1 = "" }

  if (checkShow("assimilatedValute")) {
    var valute2 = "POPULATION/S"
  }
  else { var valute2 = "" }

  if (checkShow("energyValute")) {
    var valute3 = "ENERGY/S"
  }
  else { var valute3 = "" }

  if (checkShow("potentialValute")) {
    var valute4 = "POTENTIAL/S"
  }
  else { var valute4 = "" }

  updateClass("baseMonuments", `<div>NAME</div><div>${valute1}</div><div>${valute2}</div><div>${valute3}</div><div>${valute4}</div><div>UNLOCKS</div>`)


  for (let x in IExpansor.monuments) {
    var selExp = IExpansor.monuments[x];
    var ItMonumentsGrid

    // Array con i valori da confrontare e i rispettivi colori
    if (!(selExp.active)) {
      var requirements = [selExp.req1, selExp.req2, selExp.req3, selExp.req4];
      var gameDataValues = [sec(IGameData.cellsProd), sec(IGameData.assimilatedProd), sec(IGameData.energyProd), sec(IGameData.potentialProd)];
      var backgrounds = requirements.map((req, index) => gameDataValues[index] < req ? "#8d2424" : "#174d00");

      ItMonumentsGrid = `<div>${selExp.name}</div>` +
        requirements.map((req, i) => `<div style="background-color:${backgrounds[i]}">${format(req)}</div>`).join('') +
        `<div>${selExp.unlocked}</div>`;
    } else {
      if (IExpansor.showMonuments) {
        unlockShow(x, true)
        document.getElementById(x).style.backgroundColor = "#174d00"
        ItMonumentsGrid =
          "<div style='background-color:" + "#174d00" + "'>" + selExp.name + "</div>" +
          "<div style='background-color:" + "#174d00" + "'>" + format(selExp.req1) + "</div>" +
          "<div style='background-color:" + "#174d00" + "'>" + format(selExp.req2) + "</div>" +
          "<div style='background-color:" + "#174d00" + "'>" + format(selExp.req3) + "</div>" +
          "<div style='background-color:" + "#174d00" + "'>" + format(selExp.req4) + "</div>" +
          "<div style='background-color:" + "#174d00" + "'>" + selExp.unlocked + "</div>";
      }
      else {
        unlockShow(x, false)
      }
    }

    // Creazione del markup HTML

    update(x, ItMonumentsGrid);
  }
}

function visualSoftware() {
  //softwareInfo

  updateClass("softwareUpgradesInfo", `<div>POPILATION: ${format(IGameData.assimilated)}/${format(IGameData.maxAssimilated)}</div><div> POPULATION UPGRADES </div>`)

  //software upgrades

  for (let x in ISoftware.upgrades) {

    var sel = ISoftware.upgrades[x]

    update(x, "<div>" + sel.name + " " + format(sel.effect) +
      "</div><div>" + sel.level + " / " + sel.maxLevel +
      "</div><div>" + sel.priceIdentity + ": " + format(sel.price) + "</div>")

  }

  //softwareUpgradesAssimilate
  //assimilationCenter

  updateClass("assimilationCenterInfo", `<div> SELECTED: ${ISelUpgrade.group.group2.num} / ${ISelUpgrade.group.group2.maxNum} </div><div> POPULATION CENTER </div>`)

  for (let x in ISoftware.assimilationCenter) {

    var sel = ISoftware.assimilationCenter[x]

    if (sel.active) {
      document.getElementById("assimilationBaseGrid" + x).style.background = "#174d00"
    }
    else {
      document.getElementById("assimilationBaseGrid" + x).style.background = ""
    }

    updateClass("assimilationBaseGrid" + x, `<div> ${sel.description} </div>
                                          <div> ${format(sel.effect)}</div>`)

  }
}

function visualCommunication() {
  //energy info
  update("energyInfo", `<div>ENERGY: ${format(IGameData.energy)}</div><div> ENERGY UPGRADES </div>`)

  //energy Upgrades
  for (let x in IEnergy.energyUpgrades) {

    var sel = IEnergy.energyUpgrades[x]

    update(x, `<div>${sel.level}/${sel.maxLevel}</div><div> ${sel.name} </div>
      <div> ${format(sel.effect)}</div>
      <div>${sel.priceIdentity}: ${format(sel.price)}</div>`)
  }

}

function visualScreen() {
  for (let x in IScreen.screens) {

    var sel = IScreen.screens[x]
    //funzione che li mostra se sono attivi

    //funzione che li riempie
    update(x, `<div>${sel.name}</div><div>${sel.feature1}</div><div>${sel.feature2}</div>`)
  }
}

function actuatorExpansor() {
  for (let x in IExpansor.monuments) {
    var selExp = IExpansor.monuments[x];

    if (sec(IGameData.cellsProd) >= selExp.req1 &&
      sec(IGameData.assimilatedProd) >= selExp.req2 &&
      sec(IGameData.energyProd) >= selExp.req3 &&
      sec(IGameData.potentialProd) >= selExp.req4) {
      selExp.active = true;
    }
  }
}

function visualAutomation() {

  for (let x in IAutomation.automators) {
    var sel = IAutomation.automators[x]

    if (sel.active) {
      document.getElementById(x).style.background = "#174d00"
    }
    else {
      document.getElementById(x).style.background = ""
    }

    update(x, `<b>${sel.name}</b>
               <div>${sel.description}</div>`)
  }
}

function automationActuator() {
  if (IAutomation.automators.automation1.active) {
    if (IExpansor.expansors.expansor1.level < IExpansor.expansors.expansor1.maxLevel) {
      upgradeExpansor("expansor1")
    }
  }

  if (IAutomation.automators.automation2.active) {
    if (IExpansor.expansors.expansor2.level < IExpansor.expansors.expansor2.maxLevel) {
      upgradeExpansor("expansor2")
    }
  }

  if (IAutomation.automators.automation5.active) {
    for (let x in ISoftware.upgrades) {
      let sel = ISoftware.upgrades[x]
      if (sel.level < sel.maxLevel) {
        buy(sel, 'level', sel.priceIdentity, sel.price, 1)
      }
    }
  }
}

//EQUIP BUTTON
function equipComponent(id, removeType) {

  if (id == "" && removeType != null) {
    IComponents.equipped[removeType] = ""
  }

  var Mytag1 = IComponents.components[id].tag1

  if (IComponents.components[id].active == false) {
    for (let x in IComponents.components) {

      var other = IComponents.components[x]
      if (other.active == true && other.tag1 == Mytag1 && other != id) {
        other.active = false;
      }
    }

    IComponents.components[id].active = true;
    IComponents.equipped[Mytag1] = id;
  }

  else if (IComponents.components[id].active == true || id == "") {
    IComponents.components[id].active = false
    IComponents.equipped[Mytag1] = ""
  }
}

function buy(item, propertyToUpdate, priceIdentity, price, effect) {
  if (IGameData[priceIdentity] >= price) {
    // Modifica il valore della proprietà specificata in base al tipo di effetto
    if (typeof effect == "number") {
      item[propertyToUpdate] += effect;  // Aggiorna la proprietà specificata (ad esempio: 'level', 'count', ecc.)
    }

    if (typeof effect == "boolean") {
      item[propertyToUpdate] = effect ? 1 : 0;  // Aggiorna la proprietà con un valore booleano
    }

    // Dopo l'acquisto, riduci le risorse del giocatore
    IGameData[priceIdentity] -= price;
    valuesSetter()
    return true
  }

  valuesSetter()
}

//VALUTE

function fullSetter() {
  valuesSetter()
  valuesSetterDinamic()
}


function valuesSetter() {

  //tickSpeed
  var tickSpeed2 = IGameData.tickSpeedMult;
  /*
  if (ISoftware.assimilationCenter.button6.active) {
    var tickSpeed3 = ISoftware.assimilationCenter.button6.effect
  }
  else { tickSpeed3 = 1 }
  */

  IGameData.tickSpeedProd = 1 * tickSpeed2// * tickSpeed3
  IGameData.tickSpeed = IGameData.tickSpeedProd

  //components

  //TIER1

  /*
  if (ISoftware.assimilationCenter.button9.active) {
    var componentEf1 = ISoftware.assimilationCenter.button9.effect
  }
  else { componentEf1 = 1 }
  */

  var componentEf2 = IEnergy.energyUpgrades.energyButton3.effect

  var softUpgrade3 = ISoftware.upgrades.softUpgrade3.effect

  if (IComponents.components.token5.active) {
    var compToken5 = IComponents.components.token5.effect1
  }
  else { compToken5 = 1 }


  var token1 = IComponents.components.token1

  token1.level = token1.level;
  token1.maxLevel = 100;
  token1.effect1 = Math.pow(token1.level, 1.2)/* * componentEf1*/ * compToken5; //1.2
  token1.price = Math.pow(2, token1.level) / softUpgrade3;

  var token2 = IComponents.components.token2

  token2.level = token2.level;
  token2.maxLevel = 10;
  token2.effect1 = (token2.level * 0.5 + 1)/* * componentEf1*/ * compToken5;
  token2.price = Math.pow(100, 1.5 + token2.level) / softUpgrade3;

  var token3 = IComponents.components.token3

  token3.level = token3.level;
  token3.maxLevel = 100;
  token3.effect1 = (token3.level * 0.2 + 1)/* * componentEf1*/ * compToken5;
  token3.price = (Math.pow(10, 21) * (Math.pow(1.35, token3.level))) / softUpgrade3;

  var token4 = IComponents.components.token4

  token4.level = token4.level;
  token4.maxLevel = 5;
  token4.effect1 = Math.pow(10, token4.level)/* * componentEf1*/ * compToken5;
  token4.price = (Math.pow(10, 24) * Math.pow(1000, token4.level)) / softUpgrade3;

  var token5 = IComponents.components.token5

  token5.level = token5.level;
  token5.maxLevel = 10;
  token5.effect1 = (token5.level * 2)/* * componentEf1*/;
  token5.price = (Math.pow(10, 33) * Math.pow(1000, token5.level)) / softUpgrade3;

  var token6 = IComponents.components.token6

  token6.level = token6.level;
  token6.maxLevel = 5;
  token6.effect1 = Math.pow(10, token6.level)/* * componentEf1*/ * compToken5;
  token6.price = (Math.pow(10, 35) * Math.pow(500, token6.level)) / softUpgrade3;

  var token7 = IComponents.components.token7

  token7.level = token7.level;
  token7.maxLevel = 5;
  token7.effect1 = 0.1 * token7.level * compToken5;
  token7.price = (Math.pow(10, 50) * Math.pow(Math.pow(10, 10), token7.level)) / softUpgrade3;



  //expansor

  if (IExpansor.expansorsUpgrades.expansor1U2.active) {
    var selExpansor1 = IExpansor.expansorsUpgrades.expansor1U2.effect
  }
  else { selExpansor1 = 1 }

  if (IExpansor.expansorsUpgrades.expansor2U2.active) {
    var selExpansor2 = IExpansor.expansorsUpgrades.expansor2U2.effect
  }
  else { selExpansor2 = 1 }

  if (IExpansor.expansors.expansor3.level > 0) {
    var expan3 = IExpansor.expansors.expansor3.effect
  }
  else { expan3 = 1 }

  var selExp = IExpansor.expansors.expansor1

  if (IExpansor.expansors.expansor2.level > 0) {
    var expansor2Level = IExpansor.expansors.expansor2.level
  }
  else { expansor2Level = 1 }

  selExp.level = selExp.level;
  selExp.maxLevel = 49 * expansor2Level;
  console.log(selExp.maxLevel)
  selExp.effect = Math.pow(selExp.level, 2) * selExpansor1

  selExp.price1 = 100 * (1 + Math.pow(1.2, selExp.level)) / (selExpansor2 * expan3);

  selExp = IExpansor.expansors.expansor2

  selExp.level = selExp.level;
  selExp.maxLevel = 49;
  selExp.effect = 7 * selExp.level;
  selExp.price1 = (10 ** 7) * (1 + Math.pow(selExp.level, 13));
  selExp.price2 = (100) * (1 + Math.pow(selExp.level, 2.5));

  selExp = IExpansor.expansors.expansor3

  selExp.level = selExp.level;
  selExp.maxLevel = Math.round(IExpansor.expansors.expansor2.level / 7);
  selExp.effect = 1 + Math.pow(2, selExp.level);
  selExp.price1 = (10 ** 6) * (1 + Math.pow(selExp.level, 13));
  selExp.price2 = (100) * (1 + Math.pow(selExp.level, 2.5));
  selExp.price2 = (100) * (1 + Math.pow(selExp.level, 1.5));


  //expansor upgrades

  //1U1
  var sel = IExpansor.expansorsUpgrades.expansor1U1

  sel.effect = Math.pow(1.5, Math.log(IExpansor.expansors.expansor1.effect))

  //1U2
  var sel = IExpansor.expansorsUpgrades.expansor1U2

  sel.effect = 1 + IExpansor.expansors.expansor1.level * 0.02

  //2U1
  var sel = IExpansor.expansorsUpgrades.expansor2U1

  sel.effect = Math.pow(1.6, IExpansor.expansors.expansor3.level)


  //2U2
  var sel = IExpansor.expansorsUpgrades.expansor2U2

  sel.effect = Math.pow(1.75, IExpansor.expansors.expansor3.level)

  //monuments

  var selMon = IExpansor.monuments.monument1

  selMon.req1 = (1 * 10 ** 3);
  selMon.req2 = 0;
  selMon.req3 = 0;
  selMon.req4 = 0;

  var selMon = IExpansor.monuments.monument2

  selMon.req1 = (1 * 10 ** 4);
  selMon.req2 = 0;
  selMon.req3 = 0;
  selMon.req4 = 0;

  var selMon = IExpansor.monuments.monument3

  selMon.req1 = (4 * 10 ** 4);
  selMon.req2 = 0;
  selMon.req3 = 0;
  selMon.req4 = 0;

  var selMon = IExpansor.monuments.monument4

  selMon.req1 = (2 * 10 ** 5);
  selMon.req2 = 0;
  selMon.req3 = 0;
  selMon.req4 = 0;

  var selMon = IExpansor.monuments.monument5

  selMon.req1 = (1 * 10 ** 6);
  selMon.req2 = 0;
  selMon.req3 = 0;
  selMon.req4 = 0;

  var selMon = IExpansor.monuments.monument6

  selMon.req1 = (1 * 10 ** 6);
  selMon.req2 = 8;
  selMon.req3 = 0;
  selMon.req4 = 0;

  var selMon = IExpansor.monuments.monument7

  selMon.req1 = (1 * 10 ** 28);
  selMon.req2 = (1 * 10 ** 8);
  selMon.req3 = (10 ** 4);
  selMon.req4 = 0;

  var selMon = IExpansor.monuments.monument8

  selMon.req1 = (1 * 10 ** 26);
  selMon.req2 = (1 * 10 ** 10);
  selMon.req3 = (10 ** 4);
  selMon.req4 = 0;

  var selMon = IExpansor.monuments.monument9

  selMon.req1 = (1 * 10 ** 6);
  selMon.req2 = 8;
  selMon.req3 = 0;
  selMon.req4 = 0;

  var selMon = IExpansor.monuments.monument10

  selMon.req1 = (1 * 10 ** 6);
  selMon.req2 = 8;
  selMon.req3 = 0;
  selMon.req4 = 0;

  //Software

  //softUpgrades

  var sel = ISoftware.upgrades.softUpgrade1

  sel.level = sel.level;
  sel.maxLevel = 6;
  sel.effect = Math.pow(10, sel.level)
  sel.price = Math.pow(15, 1 + sel.level)

  var sel = ISoftware.upgrades.softUpgrade2

  sel.level = sel.level;
  sel.maxLevel = 10;
  sel.effect = Math.pow(2, sel.level)
  sel.price = Math.pow(5, 1 + sel.level)

  var sel = ISoftware.upgrades.softUpgrade3

  sel.level = sel.level;
  sel.maxLevel = 4;
  sel.effect = Math.pow(10, sel.level)
  sel.price = 10 * Math.pow(10, 1 + sel.level)

  var sel = ISoftware.upgrades.softUpgrade4

  sel.level = sel.level;
  sel.maxLevel = 2;
  sel.effect = sel.level
  sel.price = 10 * Math.pow(1000, 1 + sel.level)

  /*
  var sel = ISoftware.upgrades.softUpgrade5

  sel.level = sel.level;
  sel.maxLevel = 10;
  sel.effect = Math.pow(10, sel.level)
  sel.price = Math.pow(10, 5) * Math.pow(1000, 1 + sel.level)

  var sel = ISoftware.upgrades.softUpgrade6

  sel.level = sel.level;
  sel.maxLevel = 3;
  sel.effect = sel.level * (ISoftware.currentTier)
  sel.price = Math.pow(10, 5) * Math.pow(10000, 1 + sel.level)

  var sel = ISoftware.upgrades.softUpgrade7

  sel.level = sel.level;
  sel.maxLevel = 10;
  sel.effect = Math.pow(3, sel.level)
  sel.price = Math.pow(10, 5) * Math.pow(10000, 1 + sel.level)

  var sel = ISoftware.upgrades.softUpgrade8

  sel.level = sel.level;
  sel.maxLevel = 3;
  sel.effect = sel.level
  sel.price = Math.pow(10, 5) * Math.pow(1000, 1 + sel.level)
*/

  var group = ISelUpgrade.group.group2
  var groupMaxNum1 = ISoftware.upgrades.softUpgrade4.effect
  
  /*
  var groupMaxNum2 = ISoftware.upgrades.softUpgrade8.effect
*/

  group.maxNum = 1 + groupMaxNum1

  //assimilationCenter
/*
  if (ISoftware.upgrades.softUpgrade6.level > 0) {
    var softUp6 = ISoftware.upgrades.softUpgrade6.effect
  }
  else { softUp6 = 1 }

  if (ISoftware.assimilationCenter.button7.active) {
    var buttonEf7 = ISoftware.assimilationCenter.button7.effect
  }
  else { buttonEf7 = 1 }
  

  //MAX ASSIMILATED X: 
  var sel = ISoftware.assimilationCenter.button1

  sel.effect = 10 * (softUp6 * buttonEf7)

  //boost CELLS/S by:

  var sel = ISoftware.assimilationCenter.button2

  sel.effect = 10 * (softUp6 * buttonEf7)

  //boost ASSIMILATION/S by:  

  var sel = ISoftware.assimilationCenter.button3

  sel.effect = 4 * (softUp6 * buttonEf7)

  //MAX ASSIMILATED boosts ASSIMILATED/S:

  var sel = ISoftware.assimilationCenter.button4

  sel.effect = Math.log(IGameData.maxAssimilated) * (softUp6 * buttonEf7)

  /*
  //boost ENERGY/S by:

  var sel = ISoftware.assimilationCenter.button5

  sel.effect = 5 * (softUp6 * buttonEf7)

  //boost TICKSPEED by: 

  var sel = ISoftware.assimilationCenter.button6

  sel.effect = 2 * (softUp6 * buttonEf7)

  //TIER boost is doubled: 

  var sel = ISoftware.assimilationCenter.button7

  sel.effect = 2 * softUp6

  //ancora da implementare
  //boost POTENTIAL/S by: 

  var sel = ISoftware.assimilationCenter.button8

  sel.effect = 2 * (softUp6 * buttonEf7)

  //TIER 1 COMPONENTS are stronger

  var sel = ISoftware.assimilationCenter.button9

  sel.effect = 1.1 * (softUp6 * buttonEf7)

*/
  //ENERGY

  //total level
  var sel1 = IEnergy.energyUpgrades.energyButton1.level
  var sel2 = IEnergy.energyUpgrades.energyButton2.level
  var sel3 = IEnergy.energyUpgrades.energyButton3.level
  var sel4 = IEnergy.energyUpgrades.energyButton4.level
  var sel5 = IEnergy.energyUpgrades.energyButton5.level
  var sel6 = IEnergy.energyUpgrades.energyButton6.level

  var totalLevel = sel1 + sel2 + sel3 + sel4 + sel5 + sel6

/*
  var Button2Ef = IEnergy.energyUpgrades.energyButton2.effect

  if (ISoftware.upgrades.softUpgrade7.level > 0) {
    var softUp7 = ISoftware.upgrades.softUpgrade7.effect
  }
  else { softUp7 = 1 }
  */

  //ENERGY/S
  var sel = IEnergy.energyUpgrades.energyButton1

  sel.level = sel.level
  sel.maxLevel = 5
  sel.effect = Math.pow(Math.log(2 + IGameData.energy), sel.level)/* * Button2Ef*/
  sel.price = (Math.pow(10, totalLevel) * Math.pow(10, 26) * Math.pow(1000, sel.level))/* / softUp7*/

  //All ENERGY UPGRADES X: 
  var sel = IEnergy.energyUpgrades.energyButton2

  sel.level = sel.level
  sel.maxLevel = 5
  sel.effect = Math.pow(1.5, sel.level)
  sel.price = (Math.pow(10, totalLevel) * Math.pow(10, 26) * Math.pow(1000, sel.level))/* / softUp7*/

  //All ENERGY COMPONENTS X (devo ancora fare i componenti)
  var sel = IEnergy.energyUpgrades.energyButton3

  sel.level = sel.level
  sel.maxLevel = 5
  sel.effect = Math.pow(2, sel.level)/* * Button2Ef*/
  sel.price = (Math.pow(10, totalLevel) * Math.pow(10, 26) * Math.pow(1000, sel.level))/* / softUp7*/

  //ENERGY boosts all VALUTES X: 
  var sel = IEnergy.energyUpgrades.energyButton4

  sel.level = sel.level
  sel.maxLevel = 5
  sel.effect = Math.pow(Math.log(IGameData.energy), sel.level)/* * Button2Ef*/
  sel.price = (Math.pow(10, totalLevel) * Math.pow(10, 26) * Math.pow(1000, sel.level))/* / softUp7*/

  //OVERCLOCK effect X: 
  var sel = IEnergy.energyUpgrades.energyButton5

  sel.level = sel.level
  sel.maxLevel = 5
  sel.effect = Math.pow(Math.log(IGameData.energy), sel.level)/* * Button2Ef*/
  sel.price = (Math.pow(10, totalLevel) * Math.pow(10, 26) * Math.pow(1000, sel.level))/* / softUp7*/

  //OVERCLOCK quantity: 
  var sel = IEnergy.energyUpgrades.energyButton6

  sel.level = sel.level
  sel.maxLevel = 5
  sel.effect = Math.pow(Math.log(IGameData.energy), sel.level)/* * Button2Ef*/
  sel.price = (Math.pow(10, totalLevel) * Math.pow(10, 26) * Math.pow(1000, sel.level))/* / softUp7*/

}

function valuesSetterDinamic() {

  var global1 = IEnergy.energyUpgrades.energyButton4.effect

  //cells
  if (IComponents.components.token1.active) {
    var cells1 = IComponents.components.token1.effect1
  }
  else { cells1 = 0 }

  if (IGameData.tickSpeed != 0) {
    var cells2 = IGameData.tickSpeed
  }
  else { cells2 = 1 }


  if (IGameData.expansion > 0) {
    var cells3 = IGameData.expansion
  }
  else { cells3 = 1 }

  if (IComponents.components.token3.active) {
    var cells4 = IComponents.components.token3.effect1
  }
  else { cells4 = 1 }

  if (IExpansor.expansorsUpgrades.expansor1U1.active) {
    var cells6 = IExpansor.expansorsUpgrades.expansor1U1.effect
  }
  else { cells6 = 0 }

  if (ISoftware.assimilationCenter.button2.active) {
    var cells7 = ISoftware.assimilationCenter.button2.effect
  }
  else { cells7 = 1 }

  IGameData.cellsProd = ((cells1 + cells6) * cells3 * cells4 * cells7) * cells2 * global1

  IGameData.cells += IGameData.cellsProd

  //expansion

  var expansion1 = IExpansor.expansors.expansor1.effect
  var expansion2 = IGameData.tickSpeed
  var expansion3 = IExpansor.expansors.expansor2.effect

  if (IComponents.components.token2.active) {
    var expansion4 = IComponents.components.token2.effect1
  }
  else { expansion4 = 1 }

  if (IComponents.components.token3.active) {
    var expansion5 = IComponents.components.token3.effect1
  }
  else { expansion5 = 1 }

  IGameData.expansionProd += ((expansion1 * expansion3 * expansion5) ** expansion4) * expansion2 * global1
  IGameData.expansion = Math.pow(1.5, Math.log(IGameData.expansionProd))


  //assimilatedProd

  var assimilated1 = ISoftware.upgrades.softUpgrade2.effect

  if (IComponents.components.token3.active) {
    var assimilated2 = IComponents.components.token3.effect1
  }
  else { assimilated2 = 1 }

  if (IComponents.components.token4.active) {
    var assimilated3 = IComponents.components.token4.effect1
  }
  else { assimilated3 = 1 }

  var assimilation4 = IGameData.tickSpeed

  /*
  if (ISoftware.assimilationCenter.button4.active) {
    var assimilated5 = ISoftware.assimilationCenter.button4.effect
  }
  else { assimilated5 = 1 }
*/

  if (ISoftware.assimilationCenter.button3.active) {
    var assimilated6 = ISoftware.assimilationCenter.button3.effect
  }
  else { assimilated6 = 1 }

  if (checkShow("softwareTab")) {
    var initialAssimilated = 1
  } else {
    initialAssimilated = 0;
  }

  IGameData.assimilatedProd = (initialAssimilated * assimilated1 * assimilated2 * assimilated3/* * assimilated5*/ * assimilated6) * assimilation4 * global1;

  if (IGameData.assimilated + IGameData.assimilatedProd > IGameData.maxAssimilated) {
    IGameData.assimilated = IGameData.maxAssimilated;
  }
  else {
    IGameData.assimilated += IGameData.assimilatedProd;
  }

  //assimilatedLimit

  var maxAssimilated1 = ISoftware.upgrades.softUpgrade1.effect

  if (ISoftware.assimilationCenter.button1.active) {
    var maxAssimilated2 = ISoftware.assimilationCenter.button1.effect
  }
  else { maxAssimilated2 = 1 }

  /*
  if (ISoftware.upgrades.softUpgrade5.level > 0) {
    var maxAssimilated3 = ISoftware.upgrades.softUpgrade5.effect
  }
  else { maxAssimilated3 = 1 }
  */

  if (IExpansor.expansorsUpgrades.expansor2U1.active) {
    var maxAssimilated4 = IExpansor.expansorsUpgrades.expansor2U1.effect
  }
  else { maxAssimilated4 = 1 }

  IGameData.maxAssimilated = 15 * maxAssimilated1 * maxAssimilated2/* * maxAssimilated3*/ * maxAssimilated4

  //energy

  if (IEnergy.energyUpgrades.energyButton1.level > 0) {
    var energy1 = IEnergy.energyUpgrades.energyButton1.effect
  }
  else { energy1 = 0 }

  var energy2 = IGameData.tickSpeedMult

  /*
  if (ISoftware.assimilationCenter.button5.active) {
    var energy3 = ISoftware.assimilationCenter.button5.effect
  }
  else { energy3 = 1 }
  */

  if (IComponents.components.token3.active) {
    var energy4 = IComponents.components.token3.effect1
  }
  else { energy4 = 1 }

  IGameData.energyProd = (energy1/* * energy3*/ * energy4) * energy2;
  IGameData.energy += IGameData.energyProd
}

//VALUES SETTER FIXED

//BUY ZONE

//options
//save
document.getElementById("resetSave").onclick = function () {
  resetSave()
}

document.getElementById("exportSave").onclick = function () {
  exportSave()
}

document.getElementById("importSave").onclick = function () {
  importSave()
}
//exportSave

//importSave

//TABS
document.getElementById("coreTab").onclick = function () {
  changePage("selector", "core")
}

document.getElementById("hardwareTab").onclick = function () {
  changePage("selector", "hardware")
}

document.getElementById("softwareTab").onclick = function () {
  changePage("selector", "software")
}

document.getElementById("communicationTab").onclick = function () {
  changePage("selector", "communication")
}

document.getElementById("optionsTab").onclick = function () {
  changePage("selector", "options")
}

document.getElementById("progressTab").onclick = function () {
  changePage("selector", "progress")
}

//components equip & levelup

document.getElementById("componentsLevelUp").onclick = function () {
  let selectedComponent = IComponents.components[IComponents.selected];

  // Chiama la funzione buy passando l'oggetto, la proprietà da aggiornare e i parametri di prezzo ed effetto
  if (selectedComponent.level < selectedComponent.maxLevel) {
    buy(selectedComponent, 'level', selectedComponent.priceIdentity, selectedComponent.price, 1);
  }

}

document.getElementById("componentsEquip").onclick = function () {
  equipComponent(IComponents.selected)
}

//componentsLoadout Save

document.getElementById("saveLoadout1").onclick = function () {
  componentsLoadoutSave(1)
}

document.getElementById("saveLoadout2").onclick = function () {
  componentsLoadoutSave(2)
}

document.getElementById("saveLoadout3").onclick = function () {
  componentsLoadoutSave(3)
}

//componentsLoadout Load
document.getElementById("loadLoadout1").onclick = function () {
  componentsLoadoutLoad(1)
}

document.getElementById("loadLoadout2").onclick = function () {
  componentsLoadoutLoad(2)
}

document.getElementById("loadLoadout3").onclick = function () {
  componentsLoadoutLoad(3)
}

//componentsLoadout Name
document.getElementById("loadoutName1").onmouseenter = function () {
  componentsLoadoutName(1, true);
}

document.getElementById("loadoutName2").onmouseenter = function () {
  componentsLoadoutName(2, true);
}

document.getElementById("loadoutName3").onmouseenter = function () {
  componentsLoadoutName(3, true);
}

document.getElementById("loadoutName1").onmouseleave = function () {
  componentsLoadoutName(1, false);
}

document.getElementById("loadoutName2").onmouseleave = function () {
  componentsLoadoutName(2, false);
}

document.getElementById("loadoutName3").onmouseleave = function () {
  componentsLoadoutName(3, false);
}

//Expansor

document.getElementById("expansor1Button").onclick = function () {
  if (IExpansor.expansors.expansor1.level < IExpansor.expansors.expansor1.maxLevel) {
    upgradeExpansor("expansor1")
  }
}

document.getElementById("expansor2Button").onclick = function () {
  if (IExpansor.expansors.expansor2.level < IExpansor.expansors.expansor2.maxLevel) {
    upgradeExpansor("expansor2")
  }
}

document.getElementById("expansor3Button").onclick = function () {
  if (IExpansor.expansors.expansor3.level < IExpansor.expansors.expansor3.maxLevel) {
    upgradeExpansor("expansor3")
  }
}

document.getElementById("expansor4Button").onclick = function () {
  if (IExpansor.expansors.expansor4.level < IExpansor.expansors.expansor4.maxLevel) {
    upgradeExpansor("expansor4")
  }
}

function upgradeExpansor(exp) {
  var sel = IExpansor.expansors[exp]
  var valute = IGameData

  var ac = true;

  if (!(valute.cells >= sel.price1)) {
    ac = false
  }
  if (!(valute.assimilated >= sel.price2)) {
    ac = false
  }
  if (!(valute.energy >= sel.price3)) {
    ac = false
  }
  if (!(valute.potential >= sel.price4)) {
    ac = false
  }

  //automation


  if (ac && exp == "expansor1" && IAutomation.automators.automation1.active) {

    sel.level += 1;
    valuesSetter()
    return
  }
  if (ac && exp == "expansor2" && IAutomation.automators.automation2.active) {
    sel.level += 1;
    valuesSetter()
    return
  }
  if (ac && exp == "expansor3" && IAutomation.automators.automation3.active) {
    sel.level += 1;
    valuesSetter()
    return
  }
  if (ac && exp == "expansor4" && IAutomation.automators.automation4.active) {
    sel.level += 1;
    valuesSetter()
    return
  }


  if (ac) {
    buy(sel, 'level', sel.priceIdentity1, sel.price1, 0)
    buy(sel, 'level', sel.priceIdentity2, sel.price2, 0)
    buy(sel, 'level', sel.priceIdentity3, sel.price3, 0)
    buy(sel, 'level', sel.priceIdentity4, sel.price4, 0)
    sel.level += 1;
    valuesSetter()
  }
}

document.getElementById("expansor1U1").onclick = function () {
  assignGroup(IExpansor.expansorsUpgrades, "expansor1U1")
}

document.getElementById("expansor1U2").onclick = function () {
  assignGroup(IExpansor.expansorsUpgrades, "expansor1U2")
}

document.getElementById("expansor2U1").onclick = function () {
  assignGroup(IExpansor.expansorsUpgrades, "expansor2U1")
}

document.getElementById("expansor2U2").onclick = function () {
  assignGroup(IExpansor.expansorsUpgrades, "expansor2U2")
}


document.getElementById("monumentsHider").onclick = function () {
  if (IExpansor.showMonuments) {
    IExpansor.showMonuments = false;
  }
  else {
    IExpansor.showMonuments = true;
  }
}

function assignGroup(obj, element) {
  var sel = obj[element]
  var selGroup = ISelUpgrade.group[sel.group]


  if (sel.active) {
    sel.active = false
    selGroup.num = selGroup.num - 1;
  }
  else {
    if (selGroup.num < selGroup.maxNum) {
      sel.active = true
      selGroup.num += 1;
      selGroup.lastSel = element

    } else {
      sel.active = true

      obj[selGroup.lastSel].active = false
      selGroup.lastSel = element

    }
  }
}

//assimilatedUpgrades


document.getElementById("softUpgrade1").onclick = function () {
  let sel = ISoftware.upgrades.softUpgrade1

  if (sel.level < sel.maxLevel) {
    buy(sel, 'level', sel.priceIdentity, sel.price, 1)
  }
}

document.getElementById("softUpgrade2").onclick = function () {
  let sel = ISoftware.upgrades.softUpgrade2
  if (sel.level < sel.maxLevel) {
    buy(sel, 'level', sel.priceIdentity, sel.price, 1)
  }
}

document.getElementById("softUpgrade3").onclick = function () {
  let sel = ISoftware.upgrades.softUpgrade3
  if (sel.level < sel.maxLevel) {
    buy(sel, 'level', sel.priceIdentity, sel.price, 1)
  }
}

document.getElementById("softUpgrade4").onclick = function () {
  let sel = ISoftware.upgrades.softUpgrade4
  if (sel.level < sel.maxLevel) {
    buy(sel, 'level', sel.priceIdentity, sel.price, 1)
  }
}

//assimilationCenter

document.getElementById("assimilationBaseGridbutton1").onclick = function () {
  var g = ISelUpgrade.group.group2;

  if (ISoftware.assimilationCenter.button1.active) {

    assignGroup(ISoftware.assimilationCenter, "button1")
  }
  else
    if (!(ISoftware.assimilationCenter.button1.active) && g.num != g.maxNum) {
      assignGroup(ISoftware.assimilationCenter, "button1")
    }
}

document.getElementById("assimilationBaseGridbutton2").onclick = function () {
  var g = ISelUpgrade.group.group2;

  if (ISoftware.assimilationCenter.button2.active) {

    assignGroup(ISoftware.assimilationCenter, "button2")
  }
  else
    if (!(ISoftware.assimilationCenter.button2.active) && g.num != g.maxNum) {
      assignGroup(ISoftware.assimilationCenter, "button2")
    }
}

document.getElementById("assimilationBaseGridbutton3").onclick = function () {
  var g = ISelUpgrade.group.group2;

  if (ISoftware.assimilationCenter.button3.active) {

    assignGroup(ISoftware.assimilationCenter, "button3")
  }
  else
    if (!(ISoftware.assimilationCenter.button3.active) && g.num != g.maxNum) {
      assignGroup(ISoftware.assimilationCenter, "button3")
    }
}

//energy

//energy respec
document.getElementById("respectEnergy").onclick = function () {
  for (x in IEnergy.energyUpgrades) {
    IEnergy.energyUpgrades[x].level = 0;
  }
}

//energy upgrades

document.getElementById("energyButton1").onclick = function () {
  let sel = IEnergy.energyUpgrades.energyButton1
  if (sel.level < sel.maxLevel) {
    buy(sel, 'level', sel.priceIdentity, sel.price, 1)
  }
}

document.getElementById("energyButton2").onclick = function () {
  let sel = IEnergy.energyUpgrades.energyButton2
  if (sel.level < sel.maxLevel) {
    buy(sel, 'level', sel.priceIdentity, sel.price, 1)
  }
}

document.getElementById("energyButton3").onclick = function () {
  let sel = IEnergy.energyUpgrades.energyButton3
  if (sel.level < sel.maxLevel) {
    buy(sel, 'level', sel.priceIdentity, sel.price, 1)
  }
}

document.getElementById("energyButton4").onclick = function () {
  let sel = IEnergy.energyUpgrades.energyButton4
  if (sel.level < sel.maxLevel) {
    buy(sel, 'level', sel.priceIdentity, sel.price, 1)
  }
}

document.getElementById("energyButton5").onclick = function () {
  let sel = IEnergy.energyUpgrades.energyButton5
  if (sel.level < sel.maxLevel) {
    buy(sel, 'level', sel.priceIdentity, sel.price, 1)
  }
}

document.getElementById("energyButton6").onclick = function () {
  let sel = IEnergy.energyUpgrades.energyButton6
  if (sel.level < sel.maxLevel) {
    buy(sel, 'level', sel.priceIdentity, sel.price, 1)
  }
}

//automation
document.getElementById("automation1").onclick = function () {
  activateAutomation("automation1")
}

document.getElementById("automation2").onclick = function () {
  activateAutomation("automation2")
}

document.getElementById("automation3").onclick = function () {
  activateAutomation("automation3")
}

document.getElementById("automation4").onclick = function () {
  activateAutomation("automation4")
}

document.getElementById("automation5").onclick = function () {
  activateAutomation("automation5")
}

document.getElementById("opaqueScreen").onclick = function () {
  changePage("global", "out")
}

document.getElementById("A1").onclick = function () {
  changePage("global", "hardware1")
}

document.getElementById("A2").onclick = function () {
  changePage("global", "software1")
}

document.getElementById("A3").onclick = function () {
  changePage("global", "hardware2")
}

document.getElementById("A4").onclick = function () {
  changePage("global", "software1")
}

document.getElementById("A5").onclick = function () {
  changePage("global", "communication1")
}

document.getElementById("A6").onclick = function () {
  changePage("global", "hardware3")
}

document.getElementById("A7").onclick = function () {
  changePage("global", "communication2")
}

document.getElementById("A8").onclick = function () {
  changePage("global", "software3")
}

document.getElementById("A9").onclick = function () {
  changePage("global", "communication3")
}

function activateAutomation(aut) {
  if (IAutomation.automators[aut].active) {
    IAutomation.automators[aut].active = false
    return
  }

  if (IAutomation.automators[aut].active == false) {
    IAutomation.automators[aut].active = true
    return
  }
}


//FUNCTION: PAUSE FUNCTION

function pauseFunctionPassive(fun, time, bool) {
  let SelFunction = fun + "CanCall";
  ICanCall[SelFunction] = false;
  if (time != null) {
    return new Promise(resolve => {
      setTimeout(() => {
        ICanCall[SelFunction] = true;
        resolve();
      }, time);
    });
  }
  if (time == null) {
    ICanCall[SelFunction] = bool
  }
}

//OFFLINE TIME

async function offProgress(time) {
  if (!waiting) {
    let tempTickSpeed = IGameData.tickSpeedMult

    IGameData.tickSpeedMult = sec(IGameData.tickSpeedMult) * time


    waiting = true;

    fullSetter()

    IGameData.tickSpeedMult = 0.05

    waiting = false;
  }
}

//FUNCTIONAL FUNCTIONS


//VISUAL LOOP

function format(number) {
  if (number != null) {
    let exponent = Math.floor(Math.log10(number))
    let mantissa = number / Math.pow(10, exponent)
    if (exponent < 3) return number.toFixed(1)
    return mantissa.toFixed(2) + "e" + exponent
  }

  else if (number != null) {
    return number
  }
}

function unlockShow(show, visibility) {
  let showableItem = IShowableClass.showable
  for (let a in showableItem) {
    if (a == show) {
      if (visibility == false) {
        showableItem[show] = false;
        document.getElementById(a).style.display = "none";
      }
      if (visibility == true) {
        showableItem[show] = true;
        document.getElementById(a).style.display = "";
      }
    }
  }
}

function unlockShowAll(visibility) {
  let showableItem = IShowableClass.showable
  for (let a in showableItem) {
    const keys = Object.keys(showableItem[a]);
    for (let key of keys) {
      if (visibility === false) {
        document.getElementById(key).style.display = "none";
      }
      if (visibility === true) {
        document.getElementById(key).style.display = "";
      }
    }
  }
}

function checkShow(show) {
  let showableItem = IShowableClass.showable
  for (let a in showableItem) {
    if (a == show) {
      var value = showableItem[a]
      return value;
    }
  }
}

function loopShow() {
  let showableItem = IShowableClass.showable
  for (let a in showableItem) {
    const value = showableItem[a];
    if (value == false) {
      if (document.getElementById(a) == null) {
      }
      document.getElementById(a).style.display = "none";
    }
    if (value == true) {
      document.getElementById(a).style.display = "";
    }
  }

  //initial

  if (IShowableClass.init) {
    unlockShow("hardwareSummary", true)
    unlockShow("softwareSummary", false)
    unlockShow("visualModule2", false)
    unlockShow("visualModule3", false)

    //kardashevs

    unlockShow("A1", true)
    unlockShow("A2", false)
    unlockShow("A3", false)
    unlockShow("A4", false)
    unlockShow("A5", false)
    unlockShow("A6", false)
    unlockShow("A7", false)
    unlockShow("A8", false)
    unlockShow("A9", false)
    //expansors
    unlockShow("expansor1", true)
    unlockShow("expansor2", true)
    unlockShow("expansor3", true)
    unlockShow("expansor4", true)

    //monuments

    unlockShow("monument1", true)
    unlockShow("monument2", false)
    unlockShow("monument3", false)
    unlockShow("monument4", false)
    unlockShow("monument5", false)
    unlockShow("monument6", true)
    unlockShow("monument7", false)
    unlockShow("monument8", false)
    unlockShow("monument9", false)
    unlockShow("monument10", false)

    IShowableClass.init = false;
  }

  //valutes
  if (checkShow("softwareTab")) {
    unlockShow("assimilatedValute", true)
  }

  if (checkShow("communicationTab")) {
    unlockShow("energyValute", true)
  }

  if (checkShow("core")) {
    unlockShow("core", true)
  }

  if (ITopProgress.progress.p1Check()) {
    if (ITopProgress.actualProgress < 2) {
      ITopProgress.actualProgress = 2;
      unlockShow("p2", true)
      unlockShow("hardwareTab", true)
    }
  }

  if (ITopProgress.progress.p2Check()) {
    if (ITopProgress.actualProgress < 3) {
      ITopProgress.actualProgress = 3;
      unlockShow("assimilatedValute", true)
      unlockShow("softwareTab", true)
    }
  }

  if (ITopProgress.progress.p3Check()) {
    if (ITopProgress.actualProgress < 4) {
      ITopProgress.actualProgress = 4;
      unlockShow("communicationTab", true)
    }
  }


  //expansor

  //expansor upgrades


  if (ITopProgress.actualProgress > 2) {
    unlockShow("expansor1U1", true)
    unlockShow("expansor1U2", true)
  }

  if (ITopProgress.actualProgress > 3) {
    unlockShow("expansor2U1", true)
    unlockShow("expansor2U2", true)
    unlockShow("expansor3", true)
  }

  //monuments

  if (IExpansor.monuments.monument1.active) {
    unlockShow("token2", true)
    unlockShow("monument2", true)
  }

  if (IExpansor.monuments.monument2.active) {
    unlockShow("automation1", true)
    unlockShow("monument3", true)
  }

  if (IExpansor.monuments.monument3.active) {
    unlockShow("expansor1U1", true)
    unlockShow("expansor1U2", true)
    unlockShow("monument4", true)
  }

  if (IExpansor.monuments.monument4.active) {
    ISelUpgrade.group.group1.maxNum = 2;
    unlockShow("monument5", true)
  }

  if (IExpansor.monuments.monument5.active) {
    unlockShow("A2", true)
    unlockShow("A3", true)

    ICanvas.screen.line1.active = true;
    ICanvas.screen.line2.active = true;
  }

  if (IExpansor.monuments.monument6.active) {
    unlockShow("assimilationCenter", true)
  }

  if (IExpansor.monuments.monument7.active) {
    unlockShow("visualModule3", true)
    unlockShow("token5", true)
  }

  if (IExpansor.monuments.monument8.active) {
    unlockShow("visualModule3", true)
    unlockShow("token6", true)
  }

  //assimilationCenter

  if (checkShow("assimilationCenter")) {
    unlockShow("assimilationBaseGridbutton1", true)
    unlockShow("assimilationBaseGridbutton2", true)
    unlockShow("assimilationBaseGridbutton3", true)
  }

}

function changePage(type, page) {
  if (type == "selector") {
    unlockShow("core", false)
    unlockShow("hardware", false)
    unlockShow("software", false)
    unlockShow("communication", false)
    unlockShow("options", false)
    unlockShow("progress", false)

    unlockShow(page, true)
  }

  if (type == "global") {
    unlockShow("hardware1", false)
    unlockShow("hardware2", false)
    unlockShow("hardware3", false)
    unlockShow("software1", false)
    unlockShow("software2", false)
    unlockShow("software3", false)
    unlockShow("communication1", false)
    unlockShow("communication2", false)
    unlockShow("communication3", false)
    unlockShow("opaqueScreen", false)

    if (page != "out") {
      unlockShow("opaqueScreen", true)
      unlockShow(page, true)
    }
  }
}

function visualLoopFunction() {
  if (waiting == false) {

    manualVisualLoop();
    visualScreen();
    actuatorExpansor();
    visualValute();

    if (checkShow("core")) {
      if (IComponents.selected != null) {
        visualComponentInfo(IComponents.selected);
      }

      visualComponents();
    }

    if (checkShow("hardware")) {
      visualHardware();
      visualAutomation();
    }

    if (checkShow("software")) {
      visualSoftware()
    }

    if (checkShow("communication")) {
      visualCommunication()
    }

    console.log(IShowableClass.showable)

    visualProgress();
    visualComponentsLoadout();
  }
}


var SaveGameLoop = window.setInterval(function () {
  saveGameData();
}, 1000);


var mainGameLoop = window.setInterval(function () {

  CanvasLines("screenCanvas");
  automationActuator()
  idleTimeChecker()
  fullSetter()
  visualLoopFunction()
  saveGameData();

}, 50)


function idleTimeChecker() {
  let diff = Date.now() - IGameData.lastTick

  let diffSec = diff / 1000;



  if (diffSec > IGameData.offProgressLimit) {
    diffSec = IGameData.offProgressLimit;
  }
  if (diffSec < 2) {
    diffSec = 1;
  }
  if (diffSec > 2) {
    offProgress(diffSec);
  }

  IGameData.lastTick = Date.now()

}

function manualVisualLoop() {
  loopShow();
}

function sec(x) {
  var temp = 1 / IGameData.tickSpeedMult;
  return x * temp
}

document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    exportSave()
  }
  if (document.hidden == false) {
    importSave()
    document.getElementById("Save").value = "";
  }
});
//AUTOMATION

function CanvasLines(selCanvas) {

  const canvas = document.getElementById(selCanvas);
  const canvasHeight = canvas.height

  const canvasWidth = canvas.width;

  if (selCanvas == "screenCanvas")
    for (let x in ICanvas.screen) {

      var sel = ICanvas.screen[x]

      x = canvas.getContext("2d")

      curvedX = canvasWidth * sel.startX

      if (sel.active == true) {
        x.beginPath();

        x.moveTo(canvasWidth * sel.startX, canvasHeight * sel.startY)

        x.quadraticCurveTo(canvasWidth * sel.controlPX, canvasHeight * sel.controlPY, canvasWidth * sel.endX, canvasHeight * sel.endY);

        x.stroke();
      }
    }
}