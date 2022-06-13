import { VehicalType } from "@modules/garage/enums/vehical-type";

export class Log {
    public id: string;
    public vehical_id: string;
    public vehical_type: VehicalType;
    public parking_level: string;
    public parking_space: number;
    public park_at: number;
    public leave_at: number;
}
