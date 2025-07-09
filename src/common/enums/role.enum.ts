export enum Role {
  // Group leadership roles
  CEO = 15,
  COO = 16,
  OM = 23,
  HPRO = 31,
  PO = 7, // Project Coordinator and Marketing

  // Branch management
  HPO = 19,
  BM = 14,
  HLO = 18,

  // Officers
  LO = 20,
  RO = 32,
  TRO = 13,

  // System roles
  Admin = 1,
}

export const OfficerGroup = [Role.LO, Role.RO, Role.TRO];
