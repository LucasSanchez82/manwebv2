import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabsProviderProps = {
  tabs: {
    value: string;
    node: React.ReactNode;
  }[];
};
export function TabsProvider({ tabs }: TabsProviderProps) {
  const defaultValue = tabs[0].value;
  return (
    <Tabs defaultValue={defaultValue} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        {tabs.map((tab) => (
          <TabsTrigger value={tab.value}>{tab.value}</TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent value={tab.value}>{tab.node}</TabsContent>
      ))}
    </Tabs>
  );
}
