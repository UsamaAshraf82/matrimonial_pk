
import { Image } from "expo-image";
import { Check, X } from "lucide-react-native";
import React, { useEffect } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { interpolate } from "react-native-reanimated";
import Carousel, { TAnimationStyle } from "react-native-reanimated-carousel";
import tailwind from "~/utils/tailwind";

// const data = [

// ];

  const PAGE_WIDTH = Dimensions.get("window").width;
  const PAGE_HEIGHT = Dimensions.get("window").height;
const Index = () => {
  const [data, setData] = React.useState<{ src: string; blurhash: string }[]>(
    []
  );

  useEffect(() => {
    const getData = async () => {
      const searchParams = new URLSearchParams();
      searchParams.set("query", "girl");
      searchParams.set(
        "client_id",
        "XRACyM6i07yewDJvrzcY3a5QhK8TV4K3-GR4QmKZk5c"
      );
      searchParams.set("orientation", "portrait");
      searchParams.set("count", "30");
      console.log(
        `https://api.unsplash.com/photos/random?${searchParams.toString()}`
      );
      const response = await fetch(
        `https://api.unsplash.com/photos/random?${searchParams.toString()}`
      );
      const data: unsplashType[] = await response.json();

      console.log(data)

      setData(
        data.map((item) => ({
          src: item.urls.regular,
          blurhash: item.blur_hash,
        }))
      );
    };
    getData();
  }, []);


  const animationStyle: TAnimationStyle = React.useCallback((value: number) => {
    "worklet";

    const zIndex = Math.round(interpolate(value, [-1, 0, 1], [10, 20, 30]));
    const scale = interpolate(value, [-1, 0, 1], [1.25, 1, 0.25]);
    const opacity = interpolate(value, [-0.75, 0, 1], [0, 1, 0]);

    return {
      transform: [{ scale }],
      zIndex,
      opacity,
    };
  }, []);


  return (
    <View
      id="carousel-component"
      // dataSet={{ kind: "custom-animations", name: "tinder" }}
    >
      <Carousel
        loop={false}
        style={{
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
        }}
        defaultIndex={0}
        // vertical={false}
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        data={data}
        // onConfigurePanGesture={(g) => {
        //   g.onChange((e) => {
        //     "worklet";
        //     directionAnimVal.value = Math.sign(e.translationX);
        //   });
        // }}
        // fixedDirection="negative"
        renderItem={({ index, item }) => <Item key={index} img={item} />}
        customAnimation={animationStyle}
        windowSize={5}
      />
    </View>
  );
};

const Item = ({ img }: { img: { src: string; blurhash: string } }) => {
  const width = PAGE_WIDTH;
  const height = PAGE_HEIGHT;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Image
        style={{ width: width, height: height, zIndex: 0 }}
        source={img.src}
        placeholder={{ blurhash: img.blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <TouchableOpacity
        onPress={() => {
          console.log("pressed check");
        }}
      >
        <View className="absolute bottom-24  flex-1 items-center justify-center  right-10 z-10 bg-green-700 rounded-full w-20 h-20">
          <Check />
          {/* <FontAwesome name="check" size={40} color="white" /> */}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("pressed times");
        }}
      >
        <View className="absolute bottom-24 flex-1 items-center justify-center left-10 z-10 bg-red-700 rounded-full w-20 h-20">
          <X strokeWidth={3} color={tailwind.theme.colors.white} />
          {/* <FontAwesome name="times" size={40} color="white" /> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
type unsplashType = {
  id: string;
  slug: string;
  alternative_slugs: {
    en: string;
    es: string;
    ja: string;
    fr: string;
    it: string;
    ko: string;
    de: string;
    pt: string;
    id: string;
  };
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: any[];
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: any;
  topic_submissions: {};
  asset_type: string;
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: string;
    portfolio_url: any;
    bio: any;
    location: any;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: any;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    total_illustrations: number;
    total_promoted_illustrations: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
      instagram_username: any;
      portfolio_url: any;
      twitter_username: string;
      paypal_email: any;
    };
  };
  exif: {
    make: string;
    model: string;
    name: string;
    exposure_time: string;
    aperture: string;
    focal_length: string;
    iso: number;
  };
  location: {
    name: any;
    city: any;
    country: any;
    position: {
      latitude: any;
      longitude: any;
    };
  };
  views: number;
  downloads: number;
};
