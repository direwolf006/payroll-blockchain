import { AuthEffects } from "../authentication/store/auth.effects";
import { DashboardEffects } from "../dashboard/store/dashboard.effects";
import { SalaryEffects } from "../salary/store/salary.effects";
import { TransactionEffects } from "../transaction/store/transaction.effects";

export const appEffects = [
    AuthEffects,
    DashboardEffects,
    SalaryEffects,
    TransactionEffects
]