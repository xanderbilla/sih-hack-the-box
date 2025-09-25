"use client";

import { useUserProfile } from "@/hooks/useProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Copy,
  Mail,
  Calendar,
  User,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import { ProfileSkeleton } from "@/components/profile-skeleton";

export function ProfilePage() {
  const { data: profileData, isLoading, error } = useUserProfile();

  const copyUserId = async () => {
    if (profileData?.user._id) {
      try {
        await navigator.clipboard.writeText(profileData.user._id);
        toast.success("User ID copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy User ID");
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const capitalizeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    const isAuthError =
      error instanceof Error &&
      (error.message.includes("401") || error.message.includes("403"));

    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-red-600 mb-4">
                <p className="font-semibold">
                  {isAuthError
                    ? "Authentication Required"
                    : "Failed to load profile"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {isAuthError
                    ? "Please log in to view your profile"
                    : error instanceof Error
                    ? error.message
                    : "Unknown error"}
                </p>
              </div>
              {isAuthError && (
                <Button
                  onClick={() => (window.location.href = "/login")}
                  className="mt-4"
                >
                  Go to Login
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profileData?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center text-gray-600">
              <p>No profile data available</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { user } = profileData;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
        <Card>
          <CardHeader className="text-center pb-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatarUrl} alt={user.Name} />
                <AvatarFallback className="text-lg">
                  {user.Name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex items-center space-x-2">
                <CardTitle className="text-2xl font-bold">
                  {capitalizeName(user.Name)}
                </CardTitle>
                {user.verified && (
                  <CheckCircle className="w-6 h-6 text-yellow-500 fill-current" />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyUserId}
                  className="p-1 h-auto"
                  title="Copy User ID"
                >
                  <Copy className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                </Button>
              </div>

              <Badge variant="secondary" className="text-sm">
                @{user.username}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Separator />

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Username</p>
                  <p className="text-sm text-gray-600">@{user.username}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Last Updated
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(user.updatedAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Member Since
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-center">
              <Badge
                variant={user.verified ? "default" : "secondary"}
                className={
                  user.verified
                    ? "bg-green-100 text-green-800 border-green-200"
                    : ""
                }
              >
                {user.verified ? "✓ Verified Account" : "Unverified Account"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
