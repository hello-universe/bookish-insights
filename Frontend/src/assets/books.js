import book1_img from './book1.jpg'
import book2_img from './book2.jpg'
import book3_img from './book3.jpg'
import book4_img from './book4.jpg'
import book5_img from './book5.jpg'
let all_books = [
    {
        id: 1,
        name: "With Schwarzkopf: Life Lessons of The Bear",
        author: "Gus Lee",
        category: "Biographies & Memories",
        image: book1_img,
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates quam, exercitationem quidem, quos velit fugit omnis delectus sed voluptatem inventore officiis distinctio voluptate numquam aliquam libero in? Omnis, illo accusantium?",
        rating: 4.8,
        comments: [{
            user: "User1",
            comment: "Inventore officiis distinctio voluptate numquam aliquam libero in? Omnis, illo accusantium.",
            createdAt: "17/7/2024",
            updatedAt: "17/7/2024"
        },
        {
            user: "User2",
            comment: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
            createdAt: "17/7/2024",
            updatedAt: "17/7/2024"
        }
    ],
    },
    {
        id: 2,
        name: "City of Rocks Idaho: A Climber's Guide (Regional Rock Climbing Series)",
        author: "Dave Bingham",
        category: "Sports & Outdoors",
        image: book2_img,
        description: "Exercitationem quidem, quos velit fugit omnis delectus sed voluptatem inventore officiis distinctio voluptate numquam aliquam libero in? Omnis, illo accusantium?",
        rating: 4.8,
        comments: [],
    },
    {
        id: 3,
        name: "Chemistry: The Molecular Nature of Matter and Change",
        author: "Martin Silberberg",
        category: "Science & Math",
        image: book3_img,
        description: "Exercitationem quidem, quos velit fugit omnis delectus sed voluptatem inventore officiis distinctio voluptate numquam aliquam libero in? Omnis, illo accusantium?",
        rating: 4.8,
        comments: [],
    },
    {
        id: 4,
        name: "Ireland's Wild Atlantic Way",
        author: "Carsten Krieger",
        category: "Travel",
        image: book4_img,
        description: "Exercitationem quidem, quos velit fugit omnis delectus sed voluptatem inventore officiis distinctio voluptate numquam aliquam libero in? Omnis, illo accusantium?",
        rating: 4.8,
        comments: [],
    },
    {
        id: 5,
        name: "Day Trading Options: Profiting from Price Distortions in Very Brief Time Frames",
        author: "Jeff Augen",
        category: "Business & Money",
        image: book5_img,
        description: "Exercitationem quidem, quos velit fugit omnis delectus sed voluptatem inventore officiis distinctio voluptate numquam aliquam libero in? Omnis, illo accusantium?",
        rating: 4.8,
        comments: [],
    },
];

export default all_books;