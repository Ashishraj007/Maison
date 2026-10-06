import {
  Scissors, Sparkles, Hand, User, Home, Users, TrainFront, Calendar, MessageCircle, Gem,
  LayoutGrid, Image, MapPin, Star, Search, Smartphone,
} from "lucide-react";

// Lets the config refer to icons by name.
export const ICONS = {
  scissors: Scissors, sparkles: Sparkles, hand: Hand, user: User, home: Home, users: Users,
  train: TrainFront, calendar: Calendar, message: MessageCircle, gem: Gem, grid: LayoutGrid,
  image: Image, map: MapPin, star: Star, search: Search, phone: Smartphone,
};

export const Icon = ({ name, ...props }) => {
  const C = ICONS[name] || Sparkles;
  return <C {...props} />;
};
