import { useAppSelector } from "@/store/store";

type TLocalizationProps = {
    lat: number,
    lon: number
}

export function useCountDistance({
    lat,
    lon
}: TLocalizationProps): number {

    const localization = useAppSelector((state) => state.search);

    const lat1: number = lat;
    const lon1: number = lon;
    const lat2: number = localization.lat;
    const lon2: number = localization.lon;

    const toRadians = (angle: number) => (Math.PI / 180) * angle;
    const R = 6371e3;

    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return Math.round(distance);
};
