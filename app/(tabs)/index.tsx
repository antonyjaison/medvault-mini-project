import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { cn } from '@/lib/utils';

export default function TabOneScreen() {
  const isBig = true;
  return (
    <View>
      <Text className={cn(
        "text-xl font-bold",
        isBig && "text-4xl"
      )}>Hello</Text>
    </View>
  );
}
