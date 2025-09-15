import { useEffect, useId, useState } from "react";
import { ImagePlusIcon } from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { IUser } from "@/types/UserType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditProfileSchema,
  type EditProfileInputs,
} from "@/validation/UserProfileSchema";
import useUpdateUser from "@/hooks/useUpdateUser";
import { useParams } from "react-router-dom";
import useUserAvatar from "@/hooks/useUserAvatar";

export default function EditProfileDialog({ user }: { user: IUser }) {
  const id = useId();
  const { id: paramsId } = useParams();
  const updateMutation = useUpdateUser();
  const updateAvatarMutation = useUserAvatar();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileInputs>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      username: user.username,
      bio: user.bio ?? "",
      password: undefined,
    },
  });

  const onSubmit = (data: EditProfileInputs) => {
    if (user._id === paramsId) {
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== "" && value !== undefined
        )
      );

      updateMutation.mutate({ id: paramsId, data: filteredData });

      if (selectedFile) {
        updateAvatarMutation.mutate(selectedFile);
      }
    } else {
      throw new Error("Must be the user himself");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 py-4">
          {/* Avatar */}
          <Avatar
            imageUrl={user.profilePhoto.url}
            onFileSelect={(file) => setSelectedFile(file)} 
          />

          {/* Username */}
          <div>
            <Label htmlFor={`${id}-username`}>Username</Label>
            <Input id={`${id}-username`} {...register("username")} />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor={`${id}-bio`}>Biography</Label>
            <Textarea id={`${id}-bio`} {...register("bio")} />
            {errors.bio && (
              <p className="text-red-500 text-sm">{errors.bio.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor={`${id}-password`}>Password</Label>
            <Input
              id={`${id}-password`}
              type="password"
              placeholder="Enter new password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {" "}
              {updateMutation.isPending ? "Loading..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Avatar({
  imageUrl,
  onFileSelect,
}: {
  imageUrl: string;
  onFileSelect?: (file: File) => void;
}) {
  const [{ files }, { openFileDialog, getInputProps }] = useFileUpload({
    accept: "image/*",
    initialFiles: imageUrl
      ? [
          {
            name: "avatar.jpg",
            size: 0,
            type: "image/jpeg",
            url: imageUrl,
            id: "initial-avatar",
          },
        ]
      : [],
  });

  const currentImage = files[0]?.preview || imageUrl || null;

  useEffect(() => {
    if (files.length > 0 && files[0].file) {
      onFileSelect?.(files[0].file); 
    }
  }, [files, onFileSelect]);

  return (
    <div className="mt-10 px-6">
      <div className="border-background bg-muted relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10">
        {currentImage && (
          <img
            src={currentImage}
            className="size-full object-cover"
            width={80}
            height={80}
            alt="Profile image"
          />
        )}
        <button
          type="button"
          className="focus-visible:border-ring focus-visible:ring-ring/50 absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
          onClick={openFileDialog}
          aria-label="Change profile picture"
        >
          <ImagePlusIcon size={16} aria-hidden="true" />
        </button>
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload profile picture"
        />
      </div>
    </div>
  );
}
