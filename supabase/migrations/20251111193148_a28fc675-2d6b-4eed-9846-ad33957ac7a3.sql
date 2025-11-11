-- Create app_role enum for role management
CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'citizen');

-- Create user_roles table for role-based access control
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create citizens table
CREATE TABLE public.citizens (
  nin_id TEXT PRIMARY KEY NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  dob DATE,
  current_address TEXT,
  original_lga TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on citizens table
ALTER TABLE public.citizens ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Only staff/admin can insert citizens
CREATE POLICY "Staff can insert citizens"
ON public.citizens
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'staff') OR 
  public.has_role(auth.uid(), 'admin')
);

-- RLS Policy: Only staff/admin can read citizens
CREATE POLICY "Staff can read citizens"
ON public.citizens
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'staff') OR 
  public.has_role(auth.uid(), 'admin')
);

-- RLS Policy: Only admin can update citizens
CREATE POLICY "Admin can update citizens"
ON public.citizens
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policy: Users can read their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policy: Only admins can manage roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create trigger on citizens table
CREATE TRIGGER update_citizens_updated_at
BEFORE UPDATE ON public.citizens
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();