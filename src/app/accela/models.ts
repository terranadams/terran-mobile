export interface Params {
  agency_name: string;
  client_id: string;
  client_secret: string;
  environment: string;
  grant_type: string;
  password: string;
  scope: string;
  username: string;
}

// Represents a generic text-value pair used in the response
export interface TextValue {
  text: string;
  value: string;
}

// Represents the type information of a record
export interface RecordType {
  alias: string;
  category: string;
  filterName: string;
  group: string;
  id: string;
  module: string;
  subType: string;
  text: string;
  type: string;
  value: string;
}

// Represents renewal information
export interface RenewalInfo {
  expirationDate: string; // ISO date string
  expirationStatus: TextValue;
}

// Represents a record in the response
export interface Record {
  actualProductionUnit: number;
  appearanceDate: string; // ISO date string
  appearanceDayOfWeek: string;
  assignedDate: string; // ISO date string
  assignedToDepartment: string;
  assignedUser: string;
  balance: number;
  booking: boolean;
  closedByDepartment: string;
  closedByUser: string;
  closedDate: string; // ISO date string
  completeDate: string; // ISO date string
  completedByDepartment: string;
  completedByUser: string;
  constructionType: TextValue;
  costPerUnit: number;
  createdBy: string;
  createdByCloning: string;
  customId: string;
  defendantSignature: boolean;
  description: string;
  enforceDepartment: string;
  enforceUser: string;
  enforceUserId: string;
  estimatedCostPerUnit: number;
  estimatedDueDate: string; // ISO date string
  estimatedProductionUnit: number;
  estimatedTotalJobCost: number;
  firstIssuedDate: string; // ISO date string
  housingUnits: number;
  id: string;
  inPossessionTime: number;
  infraction: boolean;
  initiatedProduct: string;
  inspectorDepartment: string;
  inspectorId: string;
  inspectorName: string;
  jobValue: number;
  misdemeanor: boolean;
  module: string;
  name: string;
  numberOfBuildings: number;
  offenseWitnessed: boolean;
  openedDate: string; // ISO date string
  overallApplicationTime: number;
  priority: TextValue;
  publicOwned: boolean;
  recordClass: string;
  renewalInfo: RenewalInfo;
  reportedChannel: TextValue;
  reportedDate: string; // ISO date string
  reportedType: TextValue;
  scheduledDate: string; // ISO date string
  serviceProviderCode: string;
  severity: TextValue;
  shortNotes: string;
  status: TextValue;
  statusDate: string; // ISO date string
  statusReason: TextValue;
  totalFee: number;
  totalJobCost: number;
  totalPay: number;
  trackingId: number;
  type: RecordType;
  undistributedCost: number;
  value: string;
}

// Represents the overall response structure of the getRecords API
export interface GetRecordsResponse {
  result: Record[];
  status: number;
}
