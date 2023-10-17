export class CreateBarbecueInput {
  title: string;
  date: Date;
  hour: string;
  isPublic?: boolean;
  totalPrice: number;
  minContribution: number;
  maxCapacity: number;
  userId: string;
}
