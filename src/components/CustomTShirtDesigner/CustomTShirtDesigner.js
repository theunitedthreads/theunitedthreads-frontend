/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import * as fabric from "fabric";
import { Typewriter } from "react-simple-typewriter";
import { Type } from "lucide-react";
import { Upload } from "lucide-react";
import { Tooltip } from "antd";
import { Button } from "@/components/ui/button";
import TextStylingWidget from "./_components/TextStylingWidget";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronsUpDown } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { Save } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import AnimatedArrow from "../AnimatedArrow/AnimatedArrow";
import { Image as AntImage } from "antd";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import * as simpleColorConverter from "simple-color-converter";
import { Info } from "lucide-react";
import { Popover } from "antd";
import { Tour } from "antd";
import {
  getFromSessionStorage,
  setToSessionStorage,
} from "@/utils/sessionStorage";
import { useGetSingleQuoteProductQuery } from "@/redux/api/Products Page Api/quoteProductsApi";
import { useParams, useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CountryStateCitySelector from "../CountryStateCitySelector/CountryStateCitySelector";
import { ErrorModal } from "@/utils/customModal";
import { errorToast, successToast } from "@/utils/customToast";
import { useCreateQuoteMutation } from "@/redux/api/quoteApi";
import { Sparkles } from "lucide-react";
import { Images } from "lucide-react";
import { Tag } from "antd";
import { SendHorizontal } from "lucide-react";
import { useGetLibraryQuery } from "@/redux/api/libraryApi";
import { Loader } from "lucide-react";
import { useGenerateWithAiMutation } from "@/redux/api/generateWithAiApi";
import SparklesLottie from "../SparklesLottie/SparklesLottie";
import { Download } from "lucide-react";
import { Trash } from "lucide-react";
import fileDownload from "js-file-download";
import axios from "axios";
import EmptyContainer from "../EmptyContainer/EmptyContainer";
import { X } from "lucide-react";
import { useGetProfileQuery } from "@/redux/api/userApi";
import pantoneToHex from "@/utils/pantoneToHex";
import { useOnClickOutside } from "usehooks-ts";
import { useMediaQuery } from "usehooks-ts";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Edit } from "lucide-react";

// Motion variants
const fadeVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
  },
};

export default function CustomTShirtDesigner() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const [aiGeneratedImageLink, setAiGeneratedImage] = useState("");

  const [showSteps, setShowSteps] = useState(true);
  const [showLeftToolBox, setShowLeftToolBox] = useState(false);
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  const [overlayColor, setOverlayColor] = useState("#000000");
  const [pantoneColorObject, setPantoneColorObject] = useState({
    pantone: "419C",
    hex: "000000",
    distance: "16",
  });
  const [sizeCollapsed, setSizeCollapsed] = useState(false);
  const [colorCollapsed, setColorCollapsed] = useState(false);
  const [pantoneColorCollapsed, setPantoneColorCollapsed] = useState(false);
  const productId = useParams()?.id;
  const router = useRouter();

  // ========= Currently active image side based on product data response ============
  const [activeImageSide, setActiveImageSide] = useState("front");
  const [activeImage, setActiveImage] = useState(null);
  const [savedFrontImageUrl, setSavedFrontImageUrl] = useState("");
  const [frontImageFile, setFrontImageFile] = useState("");
  const [savedBackImageUrl, setSavedBackImageUrl] = useState("");
  const [backImageFile, setBackImageFile] = useState("");

  const aiGenerateBoxRef = useRef(null);
  const [showAiGenerateBox, setShowAiGenerateBox] = useState(false);
  const aiPromptRef = useRef(null);

  const libraryBoxRef = useRef(null);
  const [showLibraryBox, setShowLibraryBox] = useState(false);

  // Make Generate With Ai and Library box invisible on outside click
  useOnClickOutside(aiGenerateBoxRef, () => setShowAiGenerateBox(false));
  useOnClickOutside(libraryBoxRef, () => setShowLibraryBox(false));

  // =============== Send quote api handler =============
  const [createQuote, { isLoading: isQuoteLoading }] = useCreateQuoteMutation();

  // ================= Get Library api handler =========================
  const { data: libraryRes, isLoading: libraryLoading } = useGetLibraryQuery();

  const library = libraryRes?.data || [];

  // ================= Get product api handler ======================
  const { data: productDataRes, isLoading: isProductLoading } =
    useGetSingleQuoteProductQuery(productId, { skip: !productId });
  const productData = useMemo(() => {
    if (productDataRes?.data) {
      return productDataRes?.data;
    }
    return {};
  }, [productDataRes]);

  // ================= Get user profile data ======================
  const { data: userProfileRes, refetch: promptRefetch } = useGetProfileQuery();
  const promptCount = userProfileRes?.data?.promptCount || 0;

  // Initialize active image on canvas
  useEffect(() => {
    if (productData?._id) {
      if (activeImageSide === "front") {
        setActiveImage(productData?.frontSide);
      } else {
        setActiveImage(productData?.backSide);
      }
    }
  }, [productData, activeImageSide]);

  // Initialize the Fabric.js canvas on mount
  useEffect(() => {
    const canvasInstance = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      selection: true,
    });

    setCanvas(canvasInstance);

    // Update activeObject on object selection
    canvasInstance.on("selection:created", () => {
      setActiveObject(canvasInstance.getActiveObject());
    });

    canvasInstance.on("selection:updated", () => {
      setActiveObject(canvasInstance.getActiveObject());
    });

    canvasInstance.on("selection:cleared", () => {
      setActiveObject(null);
    });

    return () => {
      canvasInstance.dispose();
    };
  }, [activeImage]);

  // ======== Handle changing the image side on button click ==========
  const handleChangeImageSide = async (whichSide) => {
    Swal.fire({
      title: "Saved Your Changes?",
      text: "Have you saved your changes? If not, please save them before switching sides. Otherwise, they will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I saved it",
      cancelButtonText: "Close",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // try {
        //   await handleExportImageOnSave();
        // } catch (error) {
        //   console.error(error);
        // }

        if (activeImageSide !== whichSide) {
          setActiveImageSide(activeImageSide === "front" ? "back" : "front");
        }
      } else {
        // do nothing
      }
    });
  };

  // ============= Function to change apparel color ==============
  const handleColorChange = (e) => {
    if (typeof e === "string") {
      setOverlayColor(e);
      return;
    }

    if (e.target.value) {
      const pantoneColor = new simpleColorConverter({
        hex6: e.target.value,
        to: "pantone",
      });

      if (pantoneColor) {
        const pantoneToHex = new simpleColorConverter({
          pantone: `pantone ${pantoneColor?.color}`,
          to: "hex6",
        });

        setOverlayColor(`#${pantoneToHex?.color}`);
      }
    }
  };

  // =============== Function to add text on apparel =================
  const handleAddText = () => {
    const text = new fabric.IText("Double click to edit", {
      left: 50,
      top: 100,
      fill: "#000000",
      fontFamily: "Arial",
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    setActiveObject(text);
    canvas.renderAll();
  };

  // ============== Function to change text style ===================
  const handleStyleChange = (style, value) => {
    if (activeObject && activeObject?.type === "i-text") {
      activeObject?.set(style, value);
      canvas.renderAll();
    }
  };

  // ================== Function to delete object from apparel =================
  const handleDeleteObject = (e) => {
    if (e.key === "Delete" && activeObject) {
      canvas.remove(activeObject);
      setActiveObject(null);
      canvas.renderAll();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleDeleteObject);
    return () => {
      document.removeEventListener("keydown", handleDeleteObject);
    };
  }, [activeObject, canvas]);

  // =================== Function to add custom picture on apparel ================
  const handleUploadCustomPicture = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgObj = new window.Image();
      imgObj.src = event.target.result;
      imgObj.onload = () => {
        const img = new fabric.Image(imgObj);
        img.scaleToHeight(300);
        img.scaleToWidth(300);
        canvas.centerObject(img);
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      };

      e.target.value = "";
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Transform hex to pantone color code
  useEffect(() => {
    if (overlayColor) {
      const pantoneColor = new simpleColorConverter({
        hex6: overlayColor,
        to: "pantone",
      });

      if (pantoneColor) {
        const pantoneToHex = new simpleColorConverter({
          pantone: `pantone ${pantoneColor?.color}`,
          to: "hex6",
        });

        // Pantone color distances are 16, 32, 48, 64, 80, 96
        const distances = [16, 32, 48, 64, 80, 96];
        const selectedDistanceIndex = Math.floor(Math.random() * 6);

        setPantoneColorObject({
          pantone: pantoneColor?.color,
          hex: pantoneToHex?.color,
          distance: distances[selectedDistanceIndex],
        });
      }
    }
  }, [overlayColor]);

  // ================== Ant design steps =========================
  const textBtnRef = useRef(null);
  const textStyleBoxRef = useRef(null);
  const uploadBtnRef = useRef(null);
  const colorBtnRef = useRef(null);
  const aiGenerateBtnRef = useRef(null);
  const libraryBtnRef = useRef(null);
  const pantoneColorRef = useRef(null);
  const saveBtnRef = useRef(null);
  const previewRef = useRef(null);

  const onTourClose = () => {
    setToSessionStorage("customTShirtDesignerTourShown", true);
  };

  const steps = [
    {
      title: "Add text",
      description:
        "Click add text button to add custom text to your apparel design.",
      target: () => textBtnRef?.current,
    },
    {
      title: "Style text",
      description: "On the bottom you've a text styling widget to style text",
      target: () => textStyleBoxRef?.current,
    },
    {
      title: "Upload image",
      description:
        "Click upload button to upload logo or image for your design.",
      target: () => uploadBtnRef?.current,
    },
    {
      title: "Add color",
      description: "Click color button to add color to your design.",
      target: () => colorBtnRef?.current,
    },
    {
      title: "Generate with AI",
      description:
        "Generate stunningly beautiful designs with Artificial Intelligence.",
      target: () => aiGenerateBtnRef?.current,
    },
    {
      title: "Library",
      description:
        "Explore our vast collection of designs and add to your design.",
      target: () => libraryBtnRef?.current,
    },
    {
      title: "Pantone color code",
      description: "This pantone color code will be applied to your apparel",
      target: () => pantoneColorRef?.current,
    },
    {
      title: "Save",
      description: "Click save button to save your design.",
      target: () => saveBtnRef?.current,
    },

    {
      title: "Preview",
      description:
        "Click preview button to preview front and back part your design.",
      target: () => previewRef?.current,
    },
  ];

  // =================== Function to convert base64 to blob =================
  const base64ToBlob = (base64Data) => {
    const byteString = atob(base64Data.split(",")[1]);
    const mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  // ================== Function to export image on save =================
  const handleExportImageOnSave = () => {
    const toastId = toast.loading("Saving...");

    if (activeImage) {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.getWidth();
      tempCanvas.height = canvas.getHeight();
      const context = tempCanvas.getContext("2d");

      const imgElement = new window.Image();
      imgElement.crossOrigin = "Anonymous";
      imgElement.src = activeImage;

      imgElement.onload = () => {
        context.drawImage(
          imgElement,
          0,
          0,
          tempCanvas.width,
          tempCanvas.height,
        );

        if (overlayColor) {
          context.globalCompositeOperation = "lighten";
          context.fillStyle = overlayColor;
          context.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
          context.globalCompositeOperation = "source-over";
        }

        // Try to export the canvas as a DataURL
        const canvasDataUrl = canvas.toDataURL();
        const canvasImage = new window.Image();
        canvasImage.src = canvasDataUrl;
        canvasImage.onload = () => {
          context.drawImage(canvasImage, 0, 0);
          const finalImageUrl = tempCanvas.toDataURL();

          // Convert image url to Blob for file conversion
          const blob = base64ToBlob(finalImageUrl);

          // Convert Blob to File
          const file = new File([blob], `tshirt-${activeImageSide}.png`, {
            type: "image/png",
          });

          if (activeImageSide === "front") {
            setSavedFrontImageUrl(finalImageUrl);
            setFrontImageFile(file);

            successToast("Image saved successfully!", toastId);
          } else {
            setSavedBackImageUrl(finalImageUrl);
            setBackImageFile(file);

            successToast("Image saved successfully!", toastId);
          }

          // Clear the canvas but retain functionality
          canvas.clear();
        };
      };

      imgElement.onerror = (error) => {
        console.error(error);
        errorToast("Failed to load image. Check CORS settings.", toastId);
      };
    }
  };

  // ================== Set form default values ======================= //

  // Set form default value
  useEffect(() => {
    if (productData) {
      setValue("category", productData.category?.name);
    }
  }, [productData]);

  // ===================== Generate With AI ====================== //
  const [generateWithAi, { isLoading: aiLoading }] =
    useGenerateWithAiMutation();
  const handleGenerateWithAI = async () => {
    const prompt = aiPromptRef?.current?.value;

    if (prompt?.length < 1) {
      return errorToast("Please enter prompt!");
    }

    if (prompt?.length > 300) {
      return errorToast("Prompt can't be more than 300 characters long!");
    }

    try {
      const res = await generateWithAi({ prompt }).unwrap();
      if (res?.success) {
        setAiGeneratedImage(res?.data[0]);

        promptRefetch();
      }
    } catch (error) {
      errorToast(error?.data?.message || error?.error);
      setAiGeneratedImage("");
    }
  };

  const handleDownloadImage = (base64Image) => {
    let url = base64Image || aiGeneratedImageLink;

    if (!url) {
      return errorToast("Please select an image first!");
    }

    // Check if the URL is already in Base64 format
    if (url.includes("data:image")) {
      const link = document.createElement("a");
      link.href = url;
      link.download = "download.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // If it's not base64 (if using URLs in the future), handle it with axios
      axios
        .get(url, {
          responseType: "blob",
          withCredentials: false,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          fileDownload(res.data, "download.jpg");
        })
        .catch((err) => {
          errorToast(err?.data?.message || err?.error);
        });
    }
  };

  // =================== Send Quote Handler ========================= //
  const onSendQuoteSubmit = async (data) => {
    if (!savedFrontImageUrl || !savedBackImageUrl) {
      return ErrorModal("Please save front & back side images first!");
    }

    if (!productData) {
      return errorToast(
        "Product details loading failed. Please try again later.",
      );
    }

    if (!data?.size) {
      return ErrorModal("Please select size!");
    }

    const toastId = toast.loading("Sending Quote...");

    const formData = new FormData();

    formData.append("frontSide", frontImageFile);
    formData.append("backSide", backImageFile);

    const payload = {
      name: productData?.name,
      category: productData?.category?._id,
      quantity: Number(data.quantity),
      size: data.size,
      pantoneColor: pantoneColorObject?.pantone,
      hexColor: `#${pantoneColorObject?.hex}`,
      materialPreferences: data.materials,
      country: data.country,
      state: data.state,
      city: data.city,
      area: data.area,
      houseNo: data.houseNo,
    };

    formData.append("data", JSON.stringify(payload));

    try {
      await createQuote(formData).unwrap();
      successToast("Quote sent successfully!", toastId);

      router.push("/user/quote-history");
    } catch (error) {
      errorToast(error?.data?.message || error?.error, toastId);
    }
  };

  // Show warning prompt when using mobile devices

  const isSmallDevice = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    if (isSmallDevice) {
      alert(
        "This page is not optimized for mobile devices. We highly recommend using a computer or a laptop for better accessibility. If at all you still need to use it with mobile phone, please enable desktop mode in your browser. Thank you",
      );
    }
  }, [isSmallDevice]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSendQuoteSubmit)}
        className="space-y-8"
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
        <div className="relative flex flex-col items-center lg:flex-row lg:items-start lg:justify-between">
          {/* Left */}
          {isSmallDevice && (
            <div className="absolute -left-5 -top-5 z-[9999]">
              <Edit
                size={20}
                onClick={() => setShowLeftToolBox(!showLeftToolBox)}
              />
            </div>
          )}
          <div
            className={cn(
              "absolute -left-0 lg:relative lg:block lg:w-[25%]",
              isSmallDevice && !showLeftToolBox ? "hidden" : "block",
            )}
          >
            <div className="flex w-max flex-col items-center gap-y-7 rounded bg-gray-200 p-3 text-primary-black lg:bg-lightGray">
              {/* Add Text */}
              <Tooltip placement="right" title="Add Text">
                <button
                  type="button"
                  className="flex flex-col items-center gap-y-1 font-medium text-primary-black hover:text-primary-black/80"
                  onClick={handleAddText}
                  ref={textBtnRef}
                >
                  <Type />
                  <p>Add Text</p>
                </button>
              </Tooltip>

              {/* Upload Design */}
              <Tooltip placement="right" title="Upload Your Logo/Design">
                <button
                  type="button"
                  className="flex flex-col items-center gap-y-1 font-medium text-primary-black hover:text-primary-black/80"
                  onClick={() =>
                    document.getElementById("custom-image-upload-input").click()
                  }
                  ref={uploadBtnRef}
                >
                  <Upload />
                  <p>Upload</p>
                </button>

                <input
                  type="file"
                  id="custom-image-upload-input"
                  onChange={handleUploadCustomPicture}
                  className="hidden"
                />
              </Tooltip>

              {/* Color */}
              <button
                type="button"
                className="flex flex-col items-center gap-y-1 font-medium text-primary-black hover:text-primary-black/80"
                ref={colorBtnRef}
              >
                <Tooltip placement="right" title="Choose T-shirt color">
                  <input
                    type="color"
                    value={overlayColor}
                    onChange={handleColorChange}
                    className="h-7 w-10"
                  />
                </Tooltip>
                Color
              </button>

              {/* AI Generate */}
              <div className="relative">
                <Tooltip placement="right" title="Generate With AI">
                  <button
                    type="button"
                    className="flex flex-col items-center gap-y-1 text-center font-medium text-primary-black hover:text-primary-black/80"
                    ref={aiGenerateBtnRef}
                    onClick={() => setShowAiGenerateBox(!showAiGenerateBox)}
                  >
                    <Sparkles size={23} className="mb-1" />
                    AI <br /> Generate
                  </button>
                </Tooltip>

                {/* AI Generate Chat */}
                <div
                  className={cn(
                    "absolute -bottom-40 left-[90px] z-[9999] h-[500px] w-[500px] rounded-3xl border border-primary-black/50 bg-[#f2f2f2] p-2 shadow-lg transition-all duration-300 ease-in-out",
                    showAiGenerateBox
                      ? "visible opacity-100"
                      : "invisible opacity-0",
                  )}
                  ref={aiGenerateBoxRef}
                >
                  {/* Generated Image */}
                  <div className="flex h-full flex-col">
                    <div className="flex h-[30px] items-center justify-between">
                      {/* Prompt Count */}
                      <div className="">
                        <Tag color="green" className="rounded-full">
                          {10 - Number(promptCount)} Prompts{" "}
                          <span className="text-[10px] font-medium">/24hr</span>
                        </Tag>
                      </div>
                      {/* Close Button */}
                      <button
                        type="button"
                        className="rounded-full bg-white p-2"
                        onClick={() => setShowAiGenerateBox(false)}
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="lg:flex-grow">
                      {aiGeneratedImageLink ? (
                        <div className="flex-center relative h-full rounded-3xl pb-10">
                          {/* download button */}
                          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-x-3">
                            <Button
                              variant="outline"
                              className="rounded-full"
                              onClick={() => {
                                setAiGeneratedImage("");
                                aiPromptRef.current.value = "";
                              }}
                            >
                              Clear <Trash size={16} className="ml-2" />
                            </Button>
                            <Button
                              type="button"
                              className="rounded-full"
                              onClick={() =>
                                handleDownloadImage(aiGeneratedImageLink)
                              }
                            >
                              Download <Download size={16} className="ml-2" />
                            </Button>
                          </div>

                          <Image
                            src={aiGeneratedImageLink}
                            alt="Generated Image"
                            height={1200}
                            width={1200}
                            className="h-auto w-auto"
                          />
                        </div>
                      ) : (
                        <>
                          {aiLoading ? (
                            <div className="flex-center h-full">
                              <SparklesLottie />
                            </div>
                          ) : (
                            <div className="flex h-full flex-col items-center justify-center gap-y-1 space-y-2 text-center font-medium">
                              <Sparkles />
                              <Typewriter
                                loop
                                words={[
                                  "Generate stunning designs with AI",
                                  "Make your creations stand out",
                                  "Customize your design",
                                  "Generate cool stuffs with ease",
                                ]}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Input */}
                    <div className="relative h-[50px]">
                      <Input
                        className={
                          "h-full rounded-3xl border border-primary-black bg-white pr-12 font-medium text-primary-black"
                        }
                        placeholder="Enter prompt..."
                        ref={aiPromptRef}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleGenerateWithAI();
                          }
                        }}
                      />
                      {/* Send Button */}
                      <Button
                        disabled={aiLoading}
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary-black p-2 text-primary-white"
                        onClick={handleGenerateWithAI}
                      >
                        <SendHorizontal size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Library */}
              <div className="relative">
                <Tooltip placement="right" title="Explore designs">
                  <button
                    type="button"
                    className="flex flex-col items-center gap-y-1 text-center font-medium text-primary-black hover:text-primary-black/80"
                    ref={libraryBtnRef}
                    onClick={() => setShowLibraryBox(!showLibraryBox)}
                  >
                    <Images size={23} className="mb-1" />
                    Library
                  </button>
                </Tooltip>

                {/* Library */}
                <div
                  className={cn(
                    "absolute -bottom-40 left-[90px] z-[9999] h-[500px] w-[500px] rounded-3xl border border-primary-black/50 bg-[#f2f2f2] p-2 shadow-lg transition-all duration-300 ease-in-out",
                    showLibraryBox
                      ? "visible opacity-100"
                      : "invisible opacity-0",
                  )}
                  ref={libraryBoxRef}
                >
                  <div style={{ height: "calc(100% - 70px)" }}>
                    {/* Close Button */}
                    <button
                      type="button"
                      className="absolute right-3 top-3 rounded-full bg-white p-2"
                      onClick={() => setShowLibraryBox(false)}
                    >
                      <X size={20} />
                    </button>

                    <div className="absolute left-4 top-4 h-full">
                      <h4 className="text-2xl font-bold">Library</h4>
                    </div>
                    <Separator className="mx-auto mt-14 w-[98%] bg-primary-black/25" />

                    {/* Images */}
                    {libraryLoading ? (
                      <div className="flex-center h-full">
                        <Loader className="animate-spin" size={25} />
                      </div>
                    ) : (
                      <>
                        {library?.length ? (
                          <div className="hide-scroll my-4 grid h-full gap-8 overflow-auto px-2 lg:grid-cols-2">
                            {library?.map((element) => (
                              <div key={element?._id} className="relative">
                                <Image
                                  src={element?.image}
                                  alt="Library Image"
                                  height={1200}
                                  width={1200}
                                  className="h-[200px] w-full cursor-pointer rounded-2xl border border-primary-black/50 bg-white p-1 transition-all duration-300 ease-in-out hover:shadow-lg"
                                />

                                <Button
                                  type="button"
                                  className="absolute right-3 top-3 aspect-square rounded-full bg-blue-700 p-0 px-3"
                                  onClick={() => {
                                    handleDownloadImage(element?.image);
                                    setShowLibraryBox(false);
                                  }}
                                >
                                  <Download size={16} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex-center h-full">
                            <EmptyContainer />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <TextStylingWidget
              handleStyleChange={handleStyleChange}
              activeObject={activeObject}
              ref={textStyleBoxRef}
            />
          </div>

          {/* Center */}
          {isProductLoading ? (
            <div className="lg:w-[50%]">
              <div className="h-[500px] w-3/4 animate-pulse rounded bg-slate-200" />
            </div>
          ) : (
            <div className="w-full lg:w-[50%]">
              <div
                id="tshirt-div"
                className="group relative w-full bg-white lg:w-3/4"
              >
                <div className="relative h-full">
                  <Image
                    src={
                      activeImageSide === "front"
                        ? productData?.frontSide
                        : productData?.backSide
                    }
                    alt={productData?.name}
                    height={1500}
                    width={1500}
                    className="mx-auto block h-[300px] w-auto lg:h-[500px]"
                    priority={true}
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: overlayColor,
                      mixBlendMode: "lighten",
                      pointerEvents: "none",
                    }}
                  ></div>
                </div>

                <div className="absolute inset-0 h-[300px] border border-dashed border-black lg:h-[500px]">
                  <canvas id="tshirt-canvas" ref={canvasRef}></canvas>
                </div>

                <Button
                  type="button"
                  className="absolute -right-10 -top-4 gap-x-2 rounded-full px-6 transition-all duration-300 ease-in-out"
                  onClick={handleExportImageOnSave}
                  ref={saveBtnRef}
                >
                  <Save size={16} /> Save
                </Button>
              </div>

              {/* Change image side buttons */}
              <div className="my-10 flex w-full items-center justify-center gap-x-5 text-primary-black lg:w-3/4">
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "group w-[22%] rounded-full border border-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white",
                    activeImageSide === "front" &&
                      "bg-primary-black text-primary-white",
                  )}
                  onClick={() => {
                    if (activeImageSide === "front") return;
                    handleChangeImageSide("front");
                  }}
                >
                  Front Side
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-[22%] rounded-full border border-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white",
                    activeImageSide === "back" &&
                      "bg-primary-black text-primary-white",
                  )}
                  onClick={() => {
                    if (activeImageSide === "back") return;
                    handleChangeImageSide("back");
                  }}
                >
                  Back Side
                </Button>
              </div>
            </div>
          )}

          {/* Right */}
          <div className="h-full w-full lg:w-[30%]">
            <Tabs defaultValue="options" className="w-full">
              <TabsList className="w-full py-5">
                <TabsTrigger
                  value="options"
                  className="w-1/2 px-10 py-2 font-medium data-[state=active]:font-extrabold"
                >
                  Options
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="w-1/2 px-10 py-2 font-medium"
                  // ref={previewBtnRef}
                  ref={previewRef}
                >
                  Preview
                </TabsTrigger>
              </TabsList>
              <TabsContent value="options" className="py-4">
                <AnimatePresence key={"options"} initial={false}>
                  {/* Size options */}
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={cn(errors?.size && "border-600 rounded-3xl")}
                  >
                    <button
                      type="button"
                      className="flex-center-between w-full rounded-t-3xl bg-lightGray p-3"
                      onClick={() => setSizeCollapsed(!sizeCollapsed)}
                    >
                      <h5 className="text-base font-semibold">
                        Available Sizes
                      </h5>
                      <ChevronsUpDown size={20} />
                    </button>
                    <Separator className="bg-primary-black/50" />

                    {!sizeCollapsed && (
                      <motion.div
                        variants={fadeVariants}
                        className="mx-auto rounded-b-3xl bg-lightGray px-6 py-4 transition-all duration-300 ease-in-out"
                      >
                        <Controller
                          control={control}
                          name="size"
                          rules={{
                            required: {
                              value: true,
                              message: "Please select a size!",
                            },
                          }}
                          render={({ field }) => (
                            <>
                              <RadioGroup
                                onValueChange={field.onChange}
                                className="grid grid-cols-2 gap-5"
                              >
                                {productData?.size?.map((size) => (
                                  <div
                                    key={size}
                                    className="flex items-center space-x-2"
                                  >
                                    <RadioGroupItem
                                      value={size}
                                      id={size}
                                      className="h-[19px] w-[19px]"
                                    />
                                    <Label
                                      htmlFor={size}
                                      className="cursor-pointer text-[17px]"
                                    >
                                      {size}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>

                              {errors?.size && (
                                <p className="mt-2 text-danger">
                                  {errors?.size?.message}
                                </p>
                              )}
                            </>
                          )}
                        />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Pantone color pallette */}
                  {pantoneColorObject?.pantone && (
                    <motion.div
                      className="mt-8"
                      layout="position"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <button
                        type="button"
                        className="flex-center-between w-full rounded-t-3xl bg-lightGray p-3"
                        onClick={() =>
                          setPantoneColorCollapsed(!pantoneColorCollapsed)
                        }
                      >
                        <h5 className="flex-center-start gap-x-2 text-base font-semibold">
                          Pantone Palette{" "}
                          <Popover
                            content={
                              <div>
                                <p>
                                  United Threads accepts only
                                  <i> Pantone Color Code</i>
                                  (e.g Pantone C-1305) for apparel colors.
                                </p>
                                <p>
                                  Our Pantone code follows distance from 16-96
                                  and provides nearest color matches.
                                </p>
                              </div>
                            }
                            title={<strong>What is Pantone Color Code?</strong>}
                          >
                            <Info size={16} className="text-blue-600" />
                          </Popover>
                        </h5>
                        <ChevronsUpDown size={20} />
                      </button>
                      <Separator className="bg-primary-black/50" />

                      {!pantoneColorCollapsed && (
                        <motion.div
                          variants={fadeVariants}
                          className="flex-center-start mx-auto gap-x-2 rounded-b-3xl bg-lightGray px-6 py-4"
                          ref={pantoneColorRef}
                        >
                          <Tooltip
                            placement="top"
                            title={"#" + pantoneColorObject?.hex}
                          >
                            <div
                              style={{
                                backgroundColor: `#${pantoneColorObject?.hex}`,
                              }}
                              className={cn(
                                "aspect-square h-6 w-6 rounded-full",
                                overlayColor === "#" + pantoneColorObject.hex &&
                                  "border-2 border-yellow-500",
                              )}
                            />
                          </Tooltip>

                          <div className="flex-center-between w-full">
                            <button
                              type="button"
                              className="text-lg font-medium"
                              onClick={() =>
                                setOverlayColor("#" + pantoneColorObject?.hex)
                              }
                            >
                              Pantone {pantoneColorObject?.pantone}
                            </button>

                            <div className="h-1 w-1 rounded-full bg-primary-black" />

                            <p>(d: 16/{pantoneColorObject?.distance})</p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Color options */}
                  <motion.div
                    className="mt-8"
                    layout="position"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <button
                      type="button"
                      className="flex-center-between w-full rounded-t-3xl bg-lightGray p-3"
                      onClick={() => setColorCollapsed(!colorCollapsed)}
                    >
                      <h5 className="text-base font-semibold">
                        Preferred Color Variants
                      </h5>
                      <ChevronsUpDown size={20} />
                    </button>
                    <Separator className="bg-primary-black/50" />

                    {!colorCollapsed && (
                      <motion.div
                        variants={fadeVariants}
                        className="mx-auto grid gap-2 rounded-b-3xl bg-lightGray px-6 py-4 lg:grid-cols-2"
                      >
                        {productData?.colorsPreferences?.map((pantone) => (
                          <button
                            type="button"
                            key={pantone}
                            className="flex-center-start gap-x-2"
                            onClick={() =>
                              handleColorChange(pantoneToHex(pantone))
                            }
                          >
                            {pantoneToHex(pantone) && (
                              <div
                                style={{
                                  backgroundColor: pantoneToHex(pantone),
                                }}
                                className={cn("h-5 w-5 rounded-full")}
                              />
                            )}
                            <h5 className="text-lg font-medium">{pantone}</h5>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </TabsContent>

              <TabsContent
                value="preview"
                className="rounded-b-xl border border-dashed p-3"
              >
                <AntImage.PreviewGroup>
                  <div>
                    <div className="flex-center-between">
                      <h4 className="text-lg font-semibold">Front Side *</h4>

                      <button
                        type="button"
                        onClick={() => {
                          if (!savedFrontImageUrl) {
                            return message.error(
                              "No saved back side image found",
                            );
                          }

                          handleDownloadImage(savedFrontImageUrl);
                        }}
                      >
                        <Download size={20} />
                      </button>
                    </div>
                    {savedFrontImageUrl ? (
                      <div className="mx-auto h-[300px] w-[300px]">
                        <AntImage
                          src={savedFrontImageUrl}
                          alt="front side image"
                        />
                      </div>
                    ) : (
                      <p className="text-center">No saved image</p>
                    )}
                  </div>

                  <Separator className="my-5" />

                  <div>
                    <div className="flex-center-between">
                      <h4 className="text-lg font-semibold">Back Side *</h4>

                      <button
                        type="button"
                        onClick={() => {
                          if (!savedBackImageUrl) {
                            return message.error(
                              "No saved back side image found",
                            );
                          }

                          handleDownloadImage(savedBackImageUrl);
                        }}
                      >
                        <Download size={20} />
                      </button>
                    </div>
                    {savedBackImageUrl ? (
                      <div className="mx-auto h-[300px] w-[300px]">
                        <AntImage
                          src={savedBackImageUrl}
                          alt="back side image"
                        />
                      </div>
                    ) : (
                      <p className="text-center">No saved image</p>
                    )}
                  </div>
                </AntImage.PreviewGroup>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Bottom --- Additional options */}
        <h3 className="mb-8 mt-20 text-2xl font-bold">Additional Options</h3>

        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="category"
            className="mb-1 block font-semibold text-primary-black"
          >
            Category
          </Label>
          <Input
            type="text"
            id="category"
            disabled={true}
            defaultValue={productData?.category?.name}
            {...register("category")}
            className="rounded-xl border border-primary-black bg-transparent text-primary-black outline-none"
          />
        </div>

        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="quantity"
            className="mb-1 block font-semibold text-primary-black"
          >
            Quantity(pcs)
          </Label>
          <Input
            type="number"
            id="quantity"
            placeholder="Enter your quantity"
            {...register("quantity", {
              required: true,
            })}
            className="rounded-xl border border-primary-black bg-transparent text-primary-black outline-none"
          />
          {errors.quantity && (
            <p className="mt-1 text-danger">Quantity is required</p>
          )}
        </div>

        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="materials"
            className="mb-1 block font-semibold text-primary-black"
          >
            Material Preferences
          </Label>
          <Textarea
            id="materials"
            placeholder="Combinations of materials are looking for 10% cotton , 90% polyester"
            {...register("materials", {
              required: true,
            })}
            className="min-h-32 rounded-xl border border-primary-black bg-transparent text-primary-black outline-none"
          />
          {errors.materials && (
            <p className="mt-1 text-danger">
              Tell us about your material preference for better understanding
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="shippingLocation"
            className="mb-3 block font-semibold text-primary-black"
          >
            Shipping Location
          </Label>

          <CountryStateCitySelector
            control={control}
            register={register}
            setValue={setValue}
            required={["country", "state", "city"]}
            errors={errors}
          />
        </div>

        <Button
          type="submit"
          disabled={isQuoteLoading}
          className="group mt-10 h-[2.8rem] w-full gap-x-2 rounded-xl bg-primary-black font-semibold"
        >
          Request for a Quote <AnimatedArrow />
        </Button>
      </form>

      {/* Ant design step tour */}
      <Tour
        open={
          !getFromSessionStorage("customTShirtDesignerTourShown") && showSteps
            ? true
            : false
        }
        onClose={() => {
          setShowSteps(false);
          onTourClose();
        }}
        steps={steps}
      />
    </div>
  );
}
