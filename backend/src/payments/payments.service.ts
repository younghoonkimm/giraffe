import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { Repository } from "typeorm";
import { USerProfileInput } from "src/users/dtos/user-profile.dto";
import { User } from "src/users/entities/user.entity";
import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from "./dtos/create-payment.dto";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { GetPaymentOutput } from "./dtos/get-payment.dto";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly payments: Repository<Payment>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}

  async createPayment(
    owner: User,
    { transactionId, restaurantId }: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    try {
      const restaurant = await this.restaurants.findOne(restaurantId);
      if (!restaurant) {
        return {
          ok: false,
          error: "Restaurant not found",
        };
      }
      if (restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: "You are not allowed to do this",
        };
      }
      await this.payments.save(
        this.payments.create({
          transactionId,
          user: owner,
          restaurant,
        }),
      );
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: "Could't not create Payments",
      };
    }
  }

  async getPayment(user: User): Promise<GetPaymentOutput> {
    try {
      const payment = await this.payments.find({ user: user });

      return {
        ok: true,
        payments: payment,
      };
    } catch {
      return {
        ok: false,
        error: "Could not load payments",
      };
    }
  }
}
