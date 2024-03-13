type User = {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    avatar: string,
    country: string,
    gender: 'female' | 'male' | 'other',
};

type MutationError = {
    data: {
        message: string
    },
    status: number,
};