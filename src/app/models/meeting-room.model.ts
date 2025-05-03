export interface MeetingRoomImage {
  id: number;
  url: string;
  archived: number;
}

export interface MeetingRoom {
  id: number;
  meetingRoomImages: MeetingRoomImage[];
  name: string;
  directionAndLocation: string;
  description: string;
  supportedSeatingArrangement: string;
  basePricePerHour: number;
  operationalTiming: string;
  supportedPaymentModes: string;
  cancellationPolicy: string;
  tvAvailble: string;
  size: number;
}
