import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const Signup = async (email, password,username) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
       
    });

    const {data:userData , error:userError} = await supabase.from('crypto').insert([{email:email,username:username}])

    if (userError) {
        console.error("Error inserting user into database:", userError.message);
    } else {
        console.log("User successfully added to database:", userData);
    }

    return data;
};


export const Login = async (email,password) => {

    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
        toast.error(error.message)
    }
  };


  export const InsertProfile = async (file, name, description, phonenumber, email, gender) => {
    if (!file) {
        toast.error("Please upload an image first");
        return;
    }

    try {
        // Create unique filename for the image
        const fileName = `profile-${Date.now()}-${file.name}`;

        // 🔹 Upload image to Supabase Storage (replace 'avatars' with your storage bucket)
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("image")  // Ensure you have a bucket named 'avatars'
            .upload(fileName, file);

        if (uploadError) {
            throw new Error(`Image upload failed: ${uploadError.message}`);
        }

        // 🔹 Get the public URL of the uploaded image
        const { data: publicUrlData } = supabase.storage.from("image").getPublicUrl(fileName);
        const imageUrl = publicUrlData.publicUrl; // Final image URL

        // 🔹 Insert profile details with image URL into the database
        const { data, error } = await supabase.from("profile").insert([
            {
                image: imageUrl,
                name,
                description,
                phonenumber,
                email,
                gender,
            },
        ]);

        if (error) {
            throw new Error(`Error adding profile: ${error.message}`);
        }

        toast.success("Profile added successfully!");
        console.log("Profile added:", data);
        return data;
    } catch (err) {
        toast.error(err.message);
        console.error(err);
        return null;
    }
};



export const fetchUser = async()=>{
    const {data,error} = await supabase.from('profile').select("*")

    if(!data){
        console.log("No data found",error)
    }
    console.log("data found",data)

    return data
}

export const editUser = async (image, phonenumber, name, email, gender, description) => {
    try {
        const { data, error } = await supabase
            .from("profile")
            .update({
                image,
                phonenumber,
                name,
                gender,
                description,
            })
            .eq("email", email) // Ensure we're updating the correct user

        if (error) {
            throw new Error(`Error updating profile: ${error.message}`);
        }

        toast.success("Profile updated successfully!");
        console.log("Updated profile:", data);
        return data;
    } catch (err) {
        toast.error(err.message);
        console.error(err);
        return null;
    }
};


export const deleteUser = async (email) => {
    try {
        const { data, error } = await supabase.from('profile').delete().eq('email', email);

        if (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }

        toast.success("User deleted successfully!");
        console.log("Deleted user:", data);
        return data;
    } catch (err) {
        toast.error(err.message);
        console.error(err);
        return null;
    }
};
