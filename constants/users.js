const RANK_GM = 'Guild Master'
const RANK_OFFICER = 'Officer'
const RANK_VETERAN = 'Veteran'
const RANK_RAIDER = 'Raider'
const RANK_MEMBER = 'Member'

const RANKS = [
    RANK_MEMBER,
    RANK_RAIDER,
    RANK_VETERAN,
    RANK_OFFICER,
    RANK_GM,
]

const CLASS_WARR = 'Warrior'
const CLASS_PALA = 'Paladin'
const CLASS_HUNT = 'Hunter'
const CLASS_ROGU = 'Rogue'
const CLASS_DRUI = 'Druid'
const CLASS_MAGE = 'Mage'
const CLASS_PRIE = 'Priest'
const CLASS_LOCK = 'Warlock'

const CLASSES = [
    CLASS_WARR,
    CLASS_PALA,
    CLASS_HUNT,
    CLASS_ROGU,
    CLASS_DRUI,
    CLASS_MAGE,
    CLASS_PRIE,
    CLASS_LOCK,
]

const ROLE_TANK = 'Tank';
const ROLE_HEAL = 'Healer';
const ROLE_MELEE = 'Melee DPS';
const ROLE_RANGE = 'Ranged DPS';

const ROLES = [
    ROLE_TANK,
    ROLE_HEAL,
    ROLE_MELEE,
    ROLE_RANGE,
]

module.exports = {
    RANK_GM,
    RANK_OFFICER,
    RANK_VETERAN,
    RANK_RAIDER,
    RANK_MEMBER,
    RANKS,
    ...CLASSES,
    CLASSES,
    ...ROLES,
    ROLES,
}