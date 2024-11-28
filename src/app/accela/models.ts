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

// Represents address information
export interface Address {
  addressLine1: string;
  addressLine2: string;
  addressTypeFlag: TextValue;
  city: string;
  country: TextValue;
  crossStreetNameStart: string;
  crossStreetNameEnd: string;
  county: string;
  description: string;
  direction: TextValue;
  distance: number;
  houseAlphaStart: string;
  houseAlphaEnd: string;
  houseFractionStart: TextValue;
  houseFractionEnd: TextValue;
  id: number;
  inspectionDistrict: string;
  inspectionDistrictPrefix: string;
  isPrimary: string;
  levelEnd: string;
  levelPrefix: string;
  levelStart: string;
  locationType: string;
  neighborhood: string;
  neighborhoodPrefix: string;
  postalCode: string;
  recordId: RecordId;
  refAddressId: number;
  secondaryStreet: string;
  secondaryStreetNumber: number;
  serviceProviderCode: string;
  state: TextValue;
  status: TextValue;
  streetAddress: string;
  streetEnd: number;
  streetEndFrom: number;
  streetEndTo: number;
  streetName: string;
  streetNameStart: string;
  streetNameEnd: string;
  streetPrefix: string;
  streetStart: number;
  streetStartFrom: number;
  streetStartTo: number;
  streetSuffix: TextValue;
  streetSuffixDirection: TextValue;
  type: TextValue;
  unitStart: string;
  unitEnd: string;
  unitType: TextValue;
  xCoordinate: number;
  yCoordinate: number;
}

// Represents record ID
export interface RecordId {
  customId: string;
  id: string;
  serviceProviderCode: string;
  trackingId: number;
  value: string;
}

// Represents contact information
export interface Contact {
  address: Address;
  birthCity: TextValue;
  birthDate: string; // ISO date string
  birthRegion: TextValue;
  birthState: TextValue;
  businessName: string;
  comment: string;
  deceasedDate: string; // ISO date string
  driverLicenseNumber: string;
  driverLicenseState: TextValue;
  email: string;
  fax: string;
  faxCountryCode: string;
  federalEmployerId: string;
  firstName: string;
  fullName: string;
  gender: TextValue;
  id: string;
  individualOrOrganization: string;
  lastName: string;
  middleName: string;
  organizationName: string;
  passportNumber: string;
  phone1: string;
  phone1CountryCode: string;
  phone2: string;
  phone2CountryCode: string;
  phone3: string;
  phone3CountryCode: string;
  postOfficeBox: string;
  preferredChannel: TextValue;
  race: TextValue;
  relation: TextValue;
  salutation: TextValue;
  serviceProviderCode: string;
  socialSecurityNumber: string;
  stateIdNumber: string;
  status: TextValue;
  suffix: string;
  title: string;
  tradeName: string;
  type: TextValue;
}

// Represents inspection result
export interface InspectionResult {
  teamName: string;
  floor: string;
  floorUnit: string;
  address: Address;
  billable: string;
  category: string;
  commentDisplay: string;
  commentPublicVisible: string[];
  completedAMPM: string;
  completedDate: string; // ISO date string
  completedTime: string;
  contact: Contact;
  contactFirstName: string;
  contactLastName: string;
  contactMiddleName: string;
  desiredAMPM: string;
  desiredDate: string; // ISO date string
  desiredTime: string;
  endMileage: number;
  endTime: string; // ISO date string
  estimatedEndTime: string;
  estimatedStartTime: string;
  gisAreaName: string;
  grade: string;
  id: number;
  inspectorFullName: string;
  inspectorId: string;
  isAutoAssign: string;
  latitude: number;
  longitude: number;
  majorViolation: number;
  overtime: string;
  priority: number;
  publicVisible: string;
  record: Record;
  recordId: RecordId;
  recordType: RecordType;
  requestAMPM: string;
  requestComment: string;
  requestDate: string; // ISO date string
  requestTime: string;
  requestorFirstName: string;
  requestorLastName: string;
  requestorMiddleName: string;
  requestorPhone: string;
  requestorPhoneIDD: string;
  requestorUserId: string;
  requiredInspection: string;
  resultComment: string;
  resultType: string;
  scheduleDate: string; // ISO date string
  scheduleEndAMPM: string;
  scheduleEndTime: string;
  scheduleStartAMPM: string;
  scheduleStartTime: string;
  serviceProviderCode: string;
  startMileage: number;
  startTime: string; // ISO date string
  status: TextValue;
  submitAMPM: string;
  submitDate: string; // ISO date string
  submitTime: string;
  totalMileage: number;
  totalScore: number;
  totalTime: number;
  type: {
    group: string;
    id: number;
    ivrNumber: number;
    text: string;
    value: string;
  };
  unitNumber: string;
  units: number;
  vehicleId: string;
}

// Represents the overall response structure for the getRecordInspections API
export interface GetRecordInspectionsResponse {
  result: InspectionResult[];
  status: number;
}

