import PageLayout from "@/layouts/PageLayout.layout";
import SearchPage from "@/screens/search/SearchPage.Screen";
import axios from "@/utils/axios";
import { useRouter } from "next/router";

interface HomeProps {
  props: any;
}

export default function Home({ props }: HomeProps) {
  const router = useRouter();
  const { search } = router.query;
  return (
    <PageLayout
      meta={{
        title: `Search: ${search} | The Digital Adventure`,
      }}
      view="search"
    >
      <SearchPage />
    </PageLayout>
  );
}
