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
    <Tabs defaultValue={defaultValue}>
      <TabsList className={"grid w-full grid-cols-" + tabs.length}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.value}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.node}
        </TabsContent>
      ))}
    </Tabs>
  );
}
