
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, ShoppingCart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Artisan {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  rating: number;
  productCount: number;
  image: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  artisan: Artisan;
  rating: number;
  category: string;
  image: string;
  reviews: Review[];
}

// Dummy data for products
const products: Product[] = [
  {
    id: 1,
    name: "Handmade Ceramic Vase",
    price: 7499,
    description: "This beautiful handcrafted ceramic vase features intricate patterns and a glazed finish. Perfect for displaying fresh flowers or as a standalone decorative piece.",
    artisan: {
      id: 1,
      name: "Mahabjan",
      specialty: "Ceramics",
      bio: "Mahabjan has been creating ceramic art for over 15 years, specializing in traditional techniques with modern design elements.",
      rating: 4.8,
      productCount: 24,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format"
    },
    rating: 4.8,
    category: "Ceramics",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&auto=format",
    reviews: [
      {
        id: 1,
        user: "Priyanka",
        rating: 5,
        comment: "Absolutely gorgeous! The craftsmanship is exceptional and it looks even better in person.",
        date: "2025-03-12"
      },
      {
        id: 2,
        user: "Rahul",
        rating: 4,
        comment: "Beautiful piece, though slightly smaller than I expected. Still very happy with the purchase.",
        date: "2025-02-28"
      }
    ]
  },
  {
    id: 2,
    name: "Organic Lavender Soap",
    price: 899,
    description: "Made with all-natural ingredients, this organic lavender soap gently cleanses while leaving your skin feeling soft and moisturized. The calming lavender scent is perfect for relaxation.",
    artisan: {
      id: 2,
      name: "Zunera",
      specialty: "Organic Soaps",
      bio: "Zunera creates all-natural soaps using traditional cold-process methods and organic ingredients from local farmers.",
      rating: 4.9,
      productCount: 18,
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format"
    },
    rating: 4.9,
    category: "Organic Soaps",
    image: "https://images.unsplash.com/photo-1602910344008-22f323cc1817?w=500&auto=format",
    reviews: [
      {
        id: 1,
        user: "Anita",
        rating: 5,
        comment: "The scent is amazing and my skin has never felt better! Will definitely purchase again.",
        date: "2025-03-18"
      },
      {
        id: 2,
        user: "Vikram",
        rating: 5,
        comment: "I bought this as a gift and my mother loved it. The packaging is also very beautiful.",
        date: "2025-03-05"
      }
    ]
  },
  {
    id: 3,
    name: "Abstract Canvas Painting",
    price: 25999,
    description: "This vibrant abstract painting features bold colors and dynamic brushwork. Each piece is unique and signed by the artist. A stunning focal point for any room.",
    artisan: {
      id: 3,
      name: "Rabiya",
      specialty: "Paintings",
      bio: "Rabiya is an abstract expressionist who has exhibited her work in several galleries across India. Her work explores themes of nature and emotion.",
      rating: 5.0,
      productCount: 12,
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=500&auto=format"
    },
    rating: 5.0,
    category: "Paintings",
    image: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?w=500&auto=format",
    reviews: [
      {
        id: 1,
        user: "Sanjay",
        rating: 5,
        comment: "This painting has transformed my living room. The colors are even more striking in person.",
        date: "2025-02-20"
      },
      {
        id: 2,
        user: "Meena",
        rating: 5,
        comment: "A true masterpiece! I've received so many compliments from guests about this painting.",
        date: "2025-01-15"
      }
    ]
  }
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = products.find(p => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  const handleAddToCart = () => {
    toast.success(`${product?.name} added to your cart`);
  };

  const handleAddToWishlist = () => {
    toast.success(`${product?.name} added to your wishlist`);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDF8F3] to-[#F8EDE3] flex items-center justify-center">
        <p className="text-[#E86C4F]">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF8F3] to-[#F8EDE3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="outline" 
          className="mb-6 border-[#E86C4F] text-[#E86C4F] hover:bg-[#E86C4F] hover:text-white" 
          onClick={() => navigate('/marketplace')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Marketplace
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="rounded-xl overflow-hidden aspect-square shadow-lg hover:shadow-xl transition-shadow">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#2D3436]">{product.name}</h1>
              <p className="text-gray-600">by {product.artisan.name}</p>
            </div>
            
            <div className="flex items-center gap-1">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-[#E86C4F] text-[#E86C4F]' : 'text-gray-300'}`} 
                />
              ))}
              <span className="ml-2 text-gray-600">{product.rating} ({product.reviews.length} reviews)</span>
            </div>
            
            <p className="text-2xl font-bold text-[#E86C4F]">₹{product.price.toLocaleString('en-IN')}</p>
            
            <p className="text-gray-700">{product.description}</p>
            
            <div className="flex gap-4">
              <Button 
                className="bg-[#E86C4F] hover:bg-[#d55d41] text-white flex-1 shadow-lg hover:shadow-xl transition-all"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="border-[#E86C4F] text-[#E86C4F] hover:bg-[#E86C4F]/10"
                onClick={handleAddToWishlist}
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Artisan Profile */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4 text-[#2D3436]">About the Artisan</h2>
              <div className="flex items-center gap-4 mb-3">
                <img 
                  src={product.artisan.image} 
                  alt={product.artisan.name} 
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#E86C4F]/20"
                />
                <div>
                  <h3 className="font-semibold text-[#2D3436]">{product.artisan.name}</h3>
                  <p className="text-gray-600">{product.artisan.specialty}</p>
                </div>
              </div>
              <p className="text-gray-700">{product.artisan.bio}</p>
              <div className="mt-3 text-sm text-gray-600">
                <span className="mr-4">{product.artisan.productCount} products</span>
                <span>{product.artisan.rating} rating</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-[#2D3436]">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map(review => (
              <Card key={review.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold text-[#2D3436]">{review.user}</h3>
                    <span className="text-gray-500 text-sm">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-[#E86C4F] text-[#E86C4F]' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
