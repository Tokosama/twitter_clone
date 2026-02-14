import Avatar from "@/components/Avatar";
import Cover from "@/components/Cover";
import Layout from "@/pages/Layout";
import PostContent from "@/components/PostContent";
import TopNavLink from "@/components/TopNavLink";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BadgeCheck, CalendarDays } from "lucide-react";
import getFollowStats from "@/lib/utils";
export default function UserPage() {
  const router = useRouter();
  const { username } = router.query;
  const [profileInfo, setProfileInfo] = useState();
  const [originalUserInfo, setOriginalUserInfo] = useState();

  const { userInfo } = useUserInfo();

  const [posts, setPosts] = useState([]);
  const [postsLikedByMe, setPostsLikedByMe] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerStats, setFollowerStats] = useState({
    followers: 0,
    following: 0,
  });

  useEffect(() => {
    if (!username) {
      return;
    }
    axios.get("/api/users?username=" + username).then((response) => {
      setProfileInfo(response.data.user);

      setOriginalUserInfo(response.data.user);
      setIsFollowing(!!response.data.follow);
    });
  }, [username]);

  useEffect(() => {
    if (!profileInfo?._id) {
      return;
    }
    axios.get("/api/posts?author=" + profileInfo._id).then((response) => {
      setPosts(response.data.posts);
      setPostsLikedByMe(response.data.idsLikedByMe);
    });
  }, [profileInfo]);

  useEffect(() => {
    async function loadFollowStats() {
      try {
        const res = await fetch(`/api/follow-stats?userId=${profileInfo?._id}`);
        const data = await res.json();
        setFollowerStats(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadFollowStats();
  }, [profileInfo]);
  function updateUserImage(type, src) {
    setProfileInfo((prev) => ({ ...prev, [type]: src }));
  }

  async function updateProfile() {
    const { bio, name, username } = profileInfo;
    await axios.put("/api/profile", {
      bio,
      name,
      username,
    });
    setEditMode(false);
  }

  function cancel() {
    setProfileInfo((prev) => {
      const { bio, name, username } = originalUserInfo;
      return { ...prev, bio, name, username };
    });
    setEditMode(false);
  }

  function toggleFollow() {
    setIsFollowing((prev) => !prev);
    axios.post("/api/followers", {
      destination: profileInfo?._id,
    });
  }
  const isMyProfile = profileInfo?._id === userInfo?._id;

  console.log(profileInfo)
  return (
    <Layout>
      <div>
        {!!profileInfo && (
          <>
            <div className="px-5 pt-2 sticky top-0 left-0 w-full bg-transparent backdrop-blur-xl z-50">
              <TopNavLink
                title={profileInfo.name}
                length={posts.length}
              />
            </div>
            <Cover
              src={profileInfo.cover}
              onChange={(src) => updateUserImage("cover", src)}
              editable={isMyProfile}
            />
            <div className="flex justify-between mb-4">
              <div className="ml-5 relative">
                <div className="absolute -top-16 border-4 rounded-full border-black overflow-hidden">
                  <Avatar
                    big
                    src={profileInfo.image}
                    editable={isMyProfile}
                    onChange={(src) => updateUserImage("image", src)}
                  />
                </div>
              </div>

              <div className="p-2">
                {!isMyProfile && (
                  <button
                    onClick={toggleFollow}
                    className={
                      (isFollowing
                        ? "bg-twitterWhite text-black"
                        : "bg-twitterBlue text-white") +
                      " py-2 px-5 rounded-full"
                    }
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                )}
                {isMyProfile && (
                  <div>
                    {!editMode && (
                      <button
                        onClick={() => setEditMode(true)}
                        className="border border-twitterLightGray hover:bg-gray-950 text-white mt-2 py-2 px-8 rounded-full"
                      >
                        Edit profile
                      </button>
                    )}
                    {editMode && (
                      <div>
                        <button
                          onClick={() => cancel()}
                          className="bg-twitterWhite text-black py-2 px-5 rounded-full mr-2"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => updateProfile()}
                          className="bg-twitterBlue text-white py-2 px-5 rounded-full"
                        >
                          Save profile
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="px-5 mt-2">
              {editMode ? (
                <div>
                  <input
                    type="text"
                    value={profileInfo.name}
                    className="bg-twitterBorder p-2 mb-2 rounded-full"
                    onChange={(ev) =>
                      setProfileInfo((prev) => ({
                        ...prev,
                        name: ev.target.value,
                      }))
                    }
                  />
                </div>
              ) : (
                <h1 className="font-bold text-xl leading-5">
                  {profileInfo.name}
                </h1>
              )}

              {!editMode && (
                <div>
                  <div className="text-twitterLightGray text-base ">
                    @{profileInfo.username}
                  </div>
                  <div className="flex gap-1 text-base my-2 text-twitterLightGray">
                    <CalendarDays
                      size={18}
                      color="#71767b"
                    />{" "}
                    Joined ******
                  </div>
                  <div className="text-sm ml-1 text-twitterLightGray">
                    <span className="text-white mr-1">
                      {followerStats.following}
                    </span>
                    Following
                    <span className="text-white ml-4 mr-1">
                      {followerStats.followers}
                    </span>
                    {followerStats.followers <= 0 ? "Follower" : "Followers"}
                  </div>
                  <div className=" w-full my-3 p-4 bg-[#004329] rounded-xl">
                    <div className="flex text-xl gap-2 font-semibold items-center">
                      You aren't verified yet <BadgeCheck size={24} />{" "}
                    </div>
                    <div className="text-sm my-2">
                      Get verified for boosted replies, analytics, ad-free
                      browsing, and more. Upgrade your profile now.
                    </div>
                    <button className="bg-white text-black mt-1 text-sm font-semibold py-1 px-3 rounded-2xl">
                      Get verified
                    </button>
                  </div>
                </div>
              )}
              {editMode && (
                <div>
                  <input
                    type="text"
                    value={profileInfo.username}
                    className="bg-twitterBorder p-2 mb-2 rounded-full"
                    onChange={(ev) =>
                      setProfileInfo((prev) => ({
                        ...prev,
                        username: ev.target.value,
                      }))
                    }
                  />
                </div>
              )}

              {!editMode && (
                <div className="text-sm mt-2 mb-2">{profileInfo.bio}</div>
              )}
              {editMode && (
                <div>
                  <textarea
                    name=" "
                    id=""
                    value={profileInfo.bio}
                    onChange={(ev) =>
                      setProfileInfo((prev) => ({
                        ...prev,
                        bio: ev.target.value,
                      }))
                    }
                    className=" bg-twitterBorder p-2 mb-2 rounded-2xl  w-full block"
                  />
                </div>
              )}
            </div>
          </>
        )}
        {posts?.length > 0 &&
          posts.map((post) => (
            <div
              className="p-5 border-t border-twitterBorder"
              key={post}
            >
              <PostContent
                {...post}
                likedByMe={postsLikedByMe.includes(post._id)}
              />
            </div>
          ))}
      </div>
    </Layout>
  );
}
