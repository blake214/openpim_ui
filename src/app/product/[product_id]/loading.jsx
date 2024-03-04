import Skeleton from "@/components/skeleton/skeleton";

export default function ProductPage({params}) {
    return (
        <div>
            Busy loading product data...
            <Skeleton/>
        </div>
    );
}
