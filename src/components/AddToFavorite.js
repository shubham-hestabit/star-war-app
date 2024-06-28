import { toast } from "react-toastify";
import { StarIcon } from '@chakra-ui/icons';
import useFavorite from "@/app/hooks/useFavorite";

export default function AddToFavorite({ id, iconSize }) {
  const { isFavorite, toggleFavorite } = useFavorite();

  const handleToggleFavorite = () => {
    toggleFavorite(id);
    const message = isFavorite(id) ? 'Removed from favorites' : 'Added to favorites';
    toast.success(message);
  };

  return (
    <button onClick={handleToggleFavorite}>
      <StarIcon boxSize={iconSize} color={isFavorite(id) ? '#F4C430' : 'lightgray'} />
    </button>
  );
}
