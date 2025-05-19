import axios from 'axios';

const API_URL = 'https://your-cms-api-endpoint.com'; // Replace with your CMS API endpoint

export const fetchProjects = async () => {
    try {
        const response = await axios.get(`${API_URL}/projects`);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const fetchBlogPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/blog`);
        return response.data;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
    }
};

export const fetchSingleBlogPost = async (slug) => {
    try {
        const response = await axios.get(`${API_URL}/blog/${slug}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching blog post with slug ${slug}:`, error);
        throw error;
    }
};