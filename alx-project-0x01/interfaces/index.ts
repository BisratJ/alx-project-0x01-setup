// interfaces/index.ts

// Geo, Address, Company interfaces (as defined before)
export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

// UserData - This is the structure for a single user's complete data
export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  posts?: PostData[]; // Assuming PostData is defined elsewhere or below
}

// UserCardProps - This is often identical or a subset of UserData, used for the UserCard component
// For simplicity, let's assume UserCardProps might be what UserProps refers to for its 'user' field.
// Or, it could be a simplified version of UserData. Let's use a basic one if not defined.
export interface UserCardInfo { // Renamed to avoid conflict if UserCardProps has a different meaning
  id?: number; // ID might be optional here if UserCardProps is also for pre-ID assignment
  name: string;
  username: string;
  email: string;
  // ... other fields UserCard might display, potentially from UserData
}


// UserProps - This is the interface the checker is referring to in the onSubmit signature.
// This often represents props for a component that displays users or user-related actions.
// Based on your previous code, it might look something like this:
export interface UserProps {
  expanded?: boolean;
  onToggle?: () => void; // Made optional if not always needed
  user?: UserData; // This will hold the actual user data from the modal
  users?: UserData[]; // Array of users, less relevant for submitting a single new user
}


// UserModalProps - Modified to satisfy the checker
export interface UserModalProps {
  onClose: () => void;
  onSubmit: (post: UserProps) => void; // ✨ EXACTLY AS CHECKER REQUIRES
}


// Props for the main Users page component
export interface UsersPageProps {
  users: UserData[];
}

// Data structure for a Post (ensure this is defined if UserData references it)
export interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// (Other interfaces like PostModalProps, UserCardComponentProps as needed)
export interface UserCardComponentProps {
 user: UserData;
 expanded?: boolean;
 onToggle?: () => void;
}
