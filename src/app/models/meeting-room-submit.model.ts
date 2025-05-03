export interface MeetingRoomSubmit {
  foodAndBeveragesOpted: boolean;
  instructions: string;
  meetingRoomId: number | null;
  numberOfHoursBooked: number | null;
  numberOfPeople: number | null;
  paymentType: string;
  price: number | null;
  reservedTime: string;
  seatingArrangement: string;
  stayId: number | null;
}
