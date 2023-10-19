export interface Session {
  user?: DefaultUser;
  userId?: string;
  expires?: number;
}

export interface DefaultUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export type Data1 = {
  session?: Session;
  status?: string;
  userId?: string;
  expires?: number;
  user?: DefaultUser;
};

export default function useSessionFake() {
  const user: DefaultUser = {
    id: "1",
    name: "John Doe",
    email: "ggg@kkk",
    image: "https://avatars3.githubusercontent.com/u/174825?s=460&v=4",
  };

  const session1: Session = {
    user: user,
    userId: "123",
  };

  const data: Data1 = {
    session: session1,
    status: "authenticated",
  };

  return {
    data,
  };
}
